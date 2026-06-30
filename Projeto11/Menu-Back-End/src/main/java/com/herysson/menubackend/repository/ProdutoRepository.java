package com.herysson.menubackend.repository;

import com.herysson.menubackend.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    Optional<Produto> findById(Long id);

    Optional<Produto> findByNome(String nome);
}
