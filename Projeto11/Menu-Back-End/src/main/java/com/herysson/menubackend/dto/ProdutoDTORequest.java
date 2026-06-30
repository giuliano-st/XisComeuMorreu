package com.herysson.menubackend.dto;

public record ProdutoDTORequest(String nome, String descricao, Double preco, String categoria, Boolean disponibilidade, String imagem) {
}
