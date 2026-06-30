package com.herysson.menubackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ItemPedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "pedidoId")
    private Pedido pedidoId;

    @ManyToOne
    @JoinColumn(name = "produtoId")
    private Produto produtoId;

    private int quantidade;
}
