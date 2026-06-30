package com.herysson.menubackend.repository;

import com.herysson.menubackend.model.ItemPedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long> {
    Optional<ItemPedido> findById(Long id);
}
