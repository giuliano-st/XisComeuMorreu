package com.herysson.menubackend.controller;

import com.herysson.menubackend.dto.PedidoDTORequest;
import com.herysson.menubackend.dto.PedidoDTOResponse;
import com.herysson.menubackend.service.PedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public ResponseEntity<PedidoDTOResponse> salvar(@RequestBody PedidoDTORequest pedidoDTO){
        return ResponseEntity.ok(pedidoService.salvar(pedidoDTO));
    }

    @GetMapping
    public ResponseEntity<List<PedidoDTOResponse>> listar(){
        return ResponseEntity.ok(pedidoService.listar());
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<PedidoDTOResponse>> listarPorCliente(
            @PathVariable Long clienteId){

        return ResponseEntity.ok(
                pedidoService.listarPorCliente(clienteId)
        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTOResponse> buscarPorId(@PathVariable Long id){
        return ResponseEntity.ok(pedidoService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoDTOResponse> atualizar(@PathVariable Long id, @RequestBody PedidoDTORequest pedidoDTO){
        return ResponseEntity.ok(pedidoService.atualizar(id,pedidoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        pedidoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
