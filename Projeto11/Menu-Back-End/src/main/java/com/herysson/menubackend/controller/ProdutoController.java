package com.herysson.menubackend.controller;

import com.herysson.menubackend.dto.ProdutoDTORequest;
import com.herysson.menubackend.dto.ProdutoDTOResponse;
import com.herysson.menubackend.service.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    public ResponseEntity<ProdutoDTOResponse> salvar(@RequestBody ProdutoDTORequest produtoDTO) {
        return ResponseEntity.ok(produtoService.salvar(produtoDTO));
    }

    @GetMapping
    public ResponseEntity<List<ProdutoDTOResponse>> listar() {
        return ResponseEntity.ok(produtoService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTOResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(produtoService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoDTOResponse> atualizar(@PathVariable Long id, @RequestBody ProdutoDTORequest produtoDTO) {
        return ResponseEntity.ok(produtoService.atualizar(id, produtoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
