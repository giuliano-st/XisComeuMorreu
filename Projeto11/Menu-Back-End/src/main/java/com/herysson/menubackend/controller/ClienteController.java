package com.herysson.menubackend.controller;

import com.herysson.menubackend.dto.ClienteDTORequest;
import com.herysson.menubackend.dto.ClienteDTOResponse;
import com.herysson.menubackend.service.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }
    @PostMapping
    public ResponseEntity<ClienteDTOResponse> salvar(@RequestBody ClienteDTORequest clienteDTO){
        return ResponseEntity.ok(clienteService.salvar(clienteDTO));
    }

    @GetMapping
    public ResponseEntity<List<ClienteDTOResponse>> listar(){
        return ResponseEntity.ok(clienteService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTOResponse> buscarPorId(@PathVariable Long id){
        return ResponseEntity.ok(clienteService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteDTOResponse> atualizar(@PathVariable Long id, @RequestBody ClienteDTORequest clienteDTO){
        return ResponseEntity.ok(clienteService.atualizar(id, clienteDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        clienteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
