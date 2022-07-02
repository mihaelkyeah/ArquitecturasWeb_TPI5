package com.example.arquitecturaweb_tp5.repository;

import com.example.arquitecturaweb_tp5.dto.ProductDTO;
import com.example.arquitecturaweb_tp5.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductReporitory extends JpaRepository<Product, Long> {
    // agregar funciones personalizadas

    /**
     * Devuelve un Product por su nombre
     * @param name
     * @return Product
     */
    @Query(value = "SELECT p FROM Product p WHERE p.name = :name")
    public Product getByName(String name);

    /**
     * Devuelve una lista de ProductDTO ordenados por cantidad de unidades vendidas
     * @return
     */

    @Query(value = "SELECT new com.example.arquitecturaweb_tp5.dto.ProductDTO(p.name,p.description,p.price) FROM Product p JOIN TicketDetails td ON p.idProduct = td.idProduct GROUP BY p.idProduct ORDER BY sum(td.quantity) DESC")
    public List<ProductDTO> masVendido();

}
