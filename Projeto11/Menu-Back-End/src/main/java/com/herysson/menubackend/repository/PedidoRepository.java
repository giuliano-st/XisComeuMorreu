package com.herysson.menubackend.repository;

import com.herysson.menubackend.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    Optional<Pedido> findById(Long id);

    List<Pedido> findByClienteIdId(Long clienteId);
}
