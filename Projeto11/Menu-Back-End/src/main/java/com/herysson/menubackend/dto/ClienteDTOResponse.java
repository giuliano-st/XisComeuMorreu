package com.herysson.menubackend.dto;

public record ClienteDTOResponse(Long id, String nome, String email, String enderecoEntrega, String preferenciaPagamento) {
}
