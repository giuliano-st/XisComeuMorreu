package com.herysson.menubackend.service;

import com.herysson.menubackend.dto.ClienteDTORequest;
import com.herysson.menubackend.dto.ClienteDTOResponse;
import com.herysson.menubackend.model.Cliente;
import com.herysson.menubackend.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public ClienteDTOResponse salvar(ClienteDTORequest clienteDTO){
        Cliente cliente = new Cliente();
        cliente.setNome(clienteDTO.nome());
        cliente.setEmail(clienteDTO.email());
        cliente.setEnderecoEntrega(clienteDTO.enderecoEntrega());
        cliente.setPreferenciaPagamento(clienteDTO.preferenciaPagamento());
        clienteRepository.save(cliente);
        return new ClienteDTOResponse(cliente.getId(), cliente.getNome(), cliente.getEmail(), cliente.getEnderecoEntrega(), cliente.getPreferenciaPagamento());
    }

    public ClienteDTOResponse buscarPorId(Long id){
        Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));
        return new ClienteDTOResponse(cliente.getId(), cliente.getNome(), cliente.getEmail(), cliente.getEnderecoEntrega(), cliente.getPreferenciaPagamento());
    }

    public List<ClienteDTOResponse> listar(){
        List<Cliente> clientes = clienteRepository.findAll();
        return clientes.stream().map(cliente -> new ClienteDTOResponse(cliente.getId(), cliente.getNome(), cliente.getEmail(), cliente.getEnderecoEntrega(), cliente.getPreferenciaPagamento())).toList();
    }

    public ClienteDTOResponse atualizar(Long id, ClienteDTORequest clienteDTO){
        Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));
        cliente.setNome(clienteDTO.nome());
        cliente.setEmail(clienteDTO.email());
        cliente.setEnderecoEntrega(clienteDTO.enderecoEntrega());
        cliente.setPreferenciaPagamento(clienteDTO.preferenciaPagamento());
        clienteRepository.save(cliente);
        return new ClienteDTOResponse(cliente.getId(), cliente.getNome(), cliente.getEmail(), cliente.getEnderecoEntrega(), cliente.getPreferenciaPagamento());
    }

    public void deletar(Long id){
        Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));
        clienteRepository.delete(cliente);
    }
}
