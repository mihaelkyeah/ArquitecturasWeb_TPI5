package com.example.arquitecturaweb_tp5.dto;

import lombok.Data;

/***
 * DTO de Cliente y el total de sus compras
 */
@Data
public class TotalComprasPorClienteDTO {
    String name;
    String lastName;
    double totalCompras;

    public TotalComprasPorClienteDTO(String name, String lastName, double totalCompras) {
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

    public double getTotalCompras() {
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


