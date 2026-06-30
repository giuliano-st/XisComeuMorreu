package com.herysson.menubackend.repository;

import com.herysson.menubackend.model.Cliente;
import com.herysson.menubackend.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findById(Long id);

    Optional<Cliente> findByEmail(String email);
}
