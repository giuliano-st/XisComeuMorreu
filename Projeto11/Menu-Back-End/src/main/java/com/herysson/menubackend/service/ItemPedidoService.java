package com.herysson.menubackend.service;

import com.herysson.menubackend.dto.ItemPedidoDTORequest;
import com.herysson.menubackend.dto.ItemPedidoDTOResponse;
import com.herysson.menubackend.model.ItemPedido;
import com.herysson.menubackend.model.Pedido;
import com.herysson.menubackend.model.Produto;
import com.herysson.menubackend.repository.ItemPedidoRepository;
import com.herysson.menubackend.repository.PedidoRepository;
import com.herysson.menubackend.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemPedidoService {
    private final ItemPedidoRepository itemPedidoRepository;
    private final PedidoRepository pedidoRepository;
    private final ProdutoRepository produtoRepository;

    public ItemPedidoService(ItemPedidoRepository itemPedidoRepository, PedidoRepository pedidoRepository, ProdutoRepository produtoRepository) {
        this.itemPedidoRepository = itemPedidoRepository;
        this.pedidoRepository = pedidoRepository;
        this.produtoRepository = produtoRepository;
    }

    public ItemPedidoDTOResponse salvar(ItemPedidoDTORequest itemPedidoDTO) {
        ItemPedido itemPedido = new ItemPedido();
        Pedido pedido = pedidoRepository.findById(itemPedidoDTO.pedidoId()).orElseThrow(() -> new RuntimeException("Pedido não encontrado!"));
        Produto produto = produtoRepository.findById(itemPedidoDTO.produtoId()).orElseThrow(() -> new RuntimeException("Produto não encontrado!"));
        itemPedido.setPedidoId(pedido);
        itemPedido.setProdutoId(produto);
        itemPedido.setQuantidade(itemPedidoDTO.quantidade());
        ItemPedido itemPedidoSalvo = itemPedidoRepository.save(itemPedido);
        return new ItemPedidoDTOResponse(itemPedidoSalvo.getId(), itemPedidoSalvo.getPedidoId().getId(), itemPedidoSalvo.getProdutoId().getId(), itemPedidoSalvo.getQuantidade());
    }

    public ItemPedidoDTOResponse buscarPorId(Long id) {
        ItemPedido itemPedido = itemPedidoRepository.findById(id).orElseThrow(() -> new RuntimeException("Item não encontrado!"));
        return new ItemPedidoDTOResponse(itemPedido.getId(), itemPedido.getPedidoId().getId(), itemPedido.getProdutoId().getId(), itemPedido.getQuantidade());
    }

    public List<ItemPedidoDTOResponse> listar() {
        List<ItemPedido> itemPedidos = itemPedidoRepository.findAll();
        return itemPedidos.stream().map(itemPedido -> new ItemPedidoDTOResponse(itemPedido.getId(), itemPedido.getPedidoId().getId(), itemPedido.getProdutoId().getId(), itemPedido.getQuantidade())).toList();
    }

    public ItemPedidoDTOResponse atualizar(Long id, ItemPedidoDTORequest itemPedidoDTO) {
        ItemPedido itemPedido = itemPedidoRepository.findById(id).orElseThrow(() -> new RuntimeException("Item não encontrado!"));
        Pedido pedido = pedidoRepository.findById(itemPedidoDTO.pedidoId()).orElseThrow(() -> new RuntimeException("Pedido não encontrado!"));
        Produto produto = produtoRepository.findById(itemPedidoDTO.produtoId()).orElseThrow(() -> new RuntimeException("Produto não encontrado!"));
        itemPedido.setPedidoId(pedido);
        itemPedido.setProdutoId(produto);
        itemPedido.setQuantidade(itemPedidoDTO.quantidade());
        ItemPedido itemPedidoSalvo = itemPedidoRepository.save(itemPedido);
        return new ItemPedidoDTOResponse(itemPedidoSalvo.getId(), itemPedidoSalvo.getPedidoId().getId(), itemPedidoSalvo.getProdutoId().getId(), itemPedidoSalvo.getQuantidade());
    }

    public void deletar(Long id) {
        ItemPedido itemPedido = itemPedidoRepository.findById(id).orElseThrow(() -> new RuntimeException("Item não encontrado!"));
        itemPedidoRepository.deleteById(id);
    }
}
