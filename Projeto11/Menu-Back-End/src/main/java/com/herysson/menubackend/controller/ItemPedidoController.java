package com.herysson.menubackend.controller;

import com.herysson.menubackend.dto.ItemPedidoDTORequest;
import com.herysson.menubackend.dto.ItemPedidoDTOResponse;
import com.herysson.menubackend.service.ItemPedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/itens")
@CrossOrigin(origins = "*")
public class ItemPedidoController {
    private final ItemPedidoService itemPedidoService;

    public ItemPedidoController(ItemPedidoService itemPedidoService) {
        this.itemPedidoService = itemPedidoService;
    }

    @PostMapping
    public ResponseEntity<ItemPedidoDTOResponse> salvar(@RequestBody ItemPedidoDTORequest itemPedidoDTO){
        return ResponseEntity.ok(itemPedidoService.salvar(itemPedidoDTO));
    }

    @GetMapping
    public ResponseEntity<List<ItemPedidoDTOResponse>> listar(){
        return ResponseEntity.ok(itemPedidoService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemPedidoDTOResponse> buscarPorId(@PathVariable Long id){
        return ResponseEntity.ok(itemPedidoService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemPedidoDTOResponse> atualizar(@PathVariable Long id, @RequestBody ItemPedidoDTORequest itemPedidoDTO){
        return ResponseEntity.ok(itemPedidoService.atualizar(id,itemPedidoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        itemPedidoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
