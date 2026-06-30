package com.herysson.menubackend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "clienteId")
    private Cliente clienteId;

    @JsonManagedReference
    @OneToMany(mappedBy = "pedidoId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemPedido> itensPedido;

    private Double valorTotal;
    private String status;
    private LocalDateTime dataPedido;
    private LocalDateTime dataEntrega;
}
