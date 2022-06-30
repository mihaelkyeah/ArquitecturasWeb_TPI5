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
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTicket;

    private Long idClient;
    private String date;
    private float total;

    public void setIdTicket(Long idTicket) {
        this.idTicket = idTicket;
    }

    public Long getIdTicket() {
        return idTicket;
    }

    public void setIdClient(Long idClient) {
        this.idClient = idClient;
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
