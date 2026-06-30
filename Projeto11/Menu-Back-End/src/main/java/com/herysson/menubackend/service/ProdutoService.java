package com.herysson.menubackend.service;

import com.herysson.menubackend.dto.ProdutoDTORequest;
import com.herysson.menubackend.dto.ProdutoDTOResponse;
import com.herysson.menubackend.model.Produto;
import com.herysson.menubackend.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public ProdutoDTOResponse salvar(ProdutoDTORequest produtoDTO) {
        Produto produto = new Produto();
        produto.setNome(produtoDTO.nome());
        produto.setDescricao(produtoDTO.descricao());
        produto.setPreco(produtoDTO.preco());
        produto.setCategoria(produtoDTO.categoria());
        produto.setDisponibilidade(produtoDTO.disponibilidade());
        produto.setImagem(produtoDTO.imagem());
        produtoRepository.save(produto);
        return new ProdutoDTOResponse(produto.getId(), produto.getNome(), produto.getDescricao(), produto.getPreco(), produto.getCategoria(), produto.getDisponibilidade(), produto.getImagem());
    }

    public ProdutoDTOResponse buscarPorId(Long id) {
        Produto produto = produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado!"));
        return new ProdutoDTOResponse(produto.getId(), produto.getNome(), produto.getDescricao(), produto.getPreco(), produto.getCategoria(), produto.getDisponibilidade(), produto.getImagem());
    }

    public List<ProdutoDTOResponse> listar() {
        List<Produto> produtos = produtoRepository.findAll();
        return produtos.stream().map(produto -> new ProdutoDTOResponse(produto.getId(), produto.getNome(), produto.getDescricao(), produto.getPreco(), produto.getCategoria(), produto.getDisponibilidade(), produto.getImagem())).toList();
    }

    public ProdutoDTOResponse atualizar(Long id, ProdutoDTORequest produtoDTO) {
        Produto produto = produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado!"));
        produto.setNome(produtoDTO.nome());
        produto.setDescricao(produtoDTO.descricao());
        produto.setPreco(produtoDTO.preco());
        produto.setCategoria(produtoDTO.categoria());
        produto.setDisponibilidade(produtoDTO.disponibilidade());
        produto.setImagem(produtoDTO.imagem());
        produtoRepository.save(produto);
        return new ProdutoDTOResponse(produto.getId(), produto.getNome(), produto.getDescricao(), produto.getPreco(), produto.getCategoria(), produto.getDisponibilidade(), produto.getImagem());
    }

    public void deletar(Long id) {
        Produto produto = produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado!"));
        produtoRepository.delete(produto);
    }
}
