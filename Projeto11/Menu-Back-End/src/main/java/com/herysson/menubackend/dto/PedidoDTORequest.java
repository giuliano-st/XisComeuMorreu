package com.herysson.menubackend.dto;

import com.herysson.menubackend.model.Cliente;
import com.herysson.menubackend.model.ItemPedido;

import java.time.LocalDateTime;
import java.util.List;

public record PedidoDTORequest(Long clienteId, List<ItemPedidoDTORequest> itensPedido, /*Double valorTotal,*/ String status, LocalDateTime dataPedido, LocalDateTime dataEntrega) {
}
