package com.herysson.menubackend.service;

import com.herysson.menubackend.dto.PedidoDTORequest;
import com.herysson.menubackend.dto.PedidoDTOResponse;
import com.herysson.menubackend.model.Cliente;
import com.herysson.menubackend.model.ItemPedido;
import com.herysson.menubackend.model.Pedido;
import com.herysson.menubackend.model.Produto;
import com.herysson.menubackend.repository.ClienteRepository;
import com.herysson.menubackend.repository.PedidoRepository;
import com.herysson.menubackend.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProdutoRepository produtoRepository;
    private final ClienteRepository clienteRepository;

    public PedidoService(PedidoRepository pedidoRepository, ProdutoRepository produtoRepository, ClienteRepository clienteRepository) {
        this.pedidoRepository = pedidoRepository;
        this.produtoRepository = produtoRepository;
        this.clienteRepository = clienteRepository;
    }

    public PedidoDTOResponse salvar(PedidoDTORequest pedidoDTO){
        Pedido pedido = new Pedido();
        Cliente cliente = clienteRepository.findById(pedidoDTO.clienteId()).orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));
        final Double[] subtotal = {0.0};
        List<ItemPedido> itensPedido = pedidoDTO.itensPedido().stream().map(itemDTO -> {
            ItemPedido item = new ItemPedido();

            Produto produto = produtoRepository.findById(itemDTO.produtoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));

            item.setPedidoId(pedido);
            item.setProdutoId(produto);
            item.setQuantidade(itemDTO.quantidade());

            Double valorDoItem = produto.getPreco() * itemDTO.quantidade();
            subtotal[0] += valorDoItem;

            return item;
        }).toList();

        Double valorTotalComGarcom = subtotal[0] * 1.10;

        pedido.setClienteId(cliente);
        pedido.setItensPedido(itensPedido);
        pedido.setValorTotal(valorTotalComGarcom);
        pedido.setStatus(pedidoDTO.status());
        pedido.setDataPedido(pedidoDTO.dataPedido());
        if ("ENTREGUE".equalsIgnoreCase(pedidoDTO.status())
                && pedido.getDataEntrega() == null) {

            pedido.setDataEntrega(LocalDateTime.now());

        } else if (!"ENTREGUE".equalsIgnoreCase(pedidoDTO.status())) {

            pedido.setDataEntrega(null);

        }
        pedidoRepository.save(pedido);
        return new PedidoDTOResponse(pedido.getId(), pedido.getClienteId(), pedido.getItensPedido(), pedido.getValorTotal(), pedido.getStatus(), pedido.getDataPedido(), pedido.getDataEntrega());
    }

    public PedidoDTOResponse buscarPorId(Long id){
        Pedido pedido = pedidoRepository.findById(id).orElseThrow(() -> new RuntimeException("Pedido não encontrado!"));
        return new PedidoDTOResponse(pedido.getId(), pedido.getClienteId(), pedido.getItensPedido(), pedido.getValorTotal(), pedido.getStatus(), pedido.getDataPedido(), pedido.getDataEntrega());
    }

    public List<PedidoDTOResponse> listar(){
        List<Pedido> pedidos = pedidoRepository.findAll();
        return pedidos.stream().map(pedido -> new PedidoDTOResponse(pedido.getId(), pedido.getClienteId(), pedido.getItensPedido(), pedido.getValorTotal(), pedido.getStatus(), pedido.getDataPedido(), pedido.getDataEntrega())).toList();
    }

    public List<PedidoDTOResponse> listarPorCliente(Long clienteId){

        List<Pedido> pedidos =
                pedidoRepository.findByClienteIdId(clienteId);

        return pedidos.stream()
                .map(pedido -> new PedidoDTOResponse(
                        pedido.getId(),
                        pedido.getClienteId(),
                        pedido.getItensPedido(),
                        pedido.getValorTotal(),
                        pedido.getStatus(),
                        pedido.getDataPedido(),
                        pedido.getDataEntrega()
                ))
                .toList();

    }

    public PedidoDTOResponse atualizar(Long id, PedidoDTORequest pedidoDTO){
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado!"));
        Cliente cliente = clienteRepository.findById(pedidoDTO.clienteId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));

        final Double[] subtotal = {0.0};

        List<ItemPedido> novosItens = pedidoDTO.itensPedido().stream().map(itemDTO -> {
            ItemPedido item = new ItemPedido();

            Produto produto = produtoRepository.findById(itemDTO.produtoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));

            item.setPedidoId(pedido);
            item.setProdutoId(produto);
            item.setQuantidade(itemDTO.quantidade());

            Double valorDoItem = produto.getPreco() * itemDTO.quantidade();
            subtotal[0] += valorDoItem;

            return item;
        }).collect(Collectors.toList());

        Double valorTotalComGarcom = subtotal[0] * 1.10;

        pedido.setClienteId(cliente);
        pedido.setValorTotal(valorTotalComGarcom);
        pedido.setStatus(pedidoDTO.status());
        pedido.setDataPedido(pedidoDTO.dataPedido());
        if ("ENTREGUE".equalsIgnoreCase(pedidoDTO.status())
                && pedido.getDataEntrega() == null) {

            pedido.setDataEntrega(LocalDateTime.now());

        } else if (!"ENTREGUE".equalsIgnoreCase(pedidoDTO.status())) {

            pedido.setDataEntrega(null);

        }

        pedido.getItensPedido().clear();
        pedido.getItensPedido().addAll(novosItens);

        pedidoRepository.save(pedido);

        return new PedidoDTOResponse(
                pedido.getId(),
                pedido.getClienteId(),
                pedido.getItensPedido(),
                pedido.getValorTotal(),
                pedido.getStatus(),
                pedido.getDataPedido(),
                pedido.getDataEntrega()
        );
    }

    public void deletar(Long id){
        Pedido pedido = pedidoRepository.findById(id).orElseThrow(() -> new RuntimeException("Pedido não encontrado!"));
        pedidoRepository.delete(pedido);
    }
}
