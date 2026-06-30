package com.herysson.menubackend.dto;

public record ProdutoDTOResponse(Long id, String nome, String descricao, Double preco, String categoria, Boolean disponibilidade, String imagem) {
}
