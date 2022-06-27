package com.example.arquitecturaweb_tp5.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table
public class Sold {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSold;
    private Long idClient;
    private Long idProduct;
    private String count;
    private String date;
    private float total;

    public Long getIdSold() {
        return idSold;
    }

    public Long getIdProduct() {
        return idProduct;
    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getIdClient() {
        return idClient;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

}
