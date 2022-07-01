package com.example.arquitecturaweb_tp5.dto;

import lombok.Data;

/***
 *  DTO de la clase producto, sin el atributo id
 */
@Data
public class ProductDTO {
    private String name;
    private String description;
    private String price;

    public ProductDTO(String name, String description, String price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getPrice() {
        return price;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
