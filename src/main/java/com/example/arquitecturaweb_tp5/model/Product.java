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
}
