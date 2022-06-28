package com.example.arquitecturaweb_tp5.dto;

import lombok.Data;

@Data
public class totalComprasPorClienteDTO {
    String name;
    String lastName;
    float totalCompras;

    public totalComprasPorClienteDTO(String name, String lastName, float totalCompras) {
        this.name = name;
        this.lastName = lastName;
        this.totalCompras = totalCompras;
    }

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }

    public float getTotalCompras() {
        return totalCompras;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setTotalCompras(float totalCompras) {
        this.totalCompras = totalCompras;
    }

    @Override
    public String toString() {
        return "totalCompraPorClienteDTO{" +
                "name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", totalCompras=" + totalCompras +
                '}';
    }
}


