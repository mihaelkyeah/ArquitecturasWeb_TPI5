package com.example.arquitecturaweb_tp5.model;

import lombok.Data;

import javax.persistence.*;
@Data
@Entity
@Table
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProduct;
    private String name;
    private String description;
    private Float price;
    private Float stock;

    public Product(Long id_product, String name, String description, Float price, Float stock) {
        this.idProduct = id_product;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }

    public Product() {

    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getPrice() {
        return this.price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Long getIdProduct() {
        return this.idProduct;
    }

    public Float getStock() {
        return this.stock;
    }

    public void setStock(Float stock) {
        this.stock = stock;
    }
}
