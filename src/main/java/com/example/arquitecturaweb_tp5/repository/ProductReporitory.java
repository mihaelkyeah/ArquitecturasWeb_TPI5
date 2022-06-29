package com.example.arquitecturaweb_tp5.repository;

import com.example.arquitecturaweb_tp5.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductReporitory extends JpaRepository<Product, Long> {
    // agregar funciones personalizadas

    @Query(value = "SELECT p FROM Product p WHERE p.name = :name")
    public Product getByName(String name);

    @Query(value = "SELECT p.name FROM Product p WHERE p.id = (SELECT td.idProduct FROM TicketDetais td GROUP BY td.idProduct ORDER BY sum(td.quantity) DESC)")
    public String masVendido();
}
