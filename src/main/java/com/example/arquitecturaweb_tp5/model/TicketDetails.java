package com.example.arquitecturaweb_tp5.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table
public class TicketDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTicketDetails;
    private Long idTicket;
    private Long idProduct;
    private float quantity;
    private float price;

    public TicketDetails(Long id_ticket_details, Long id_ticket, Long id_product, Float price, Float quantity) {
        this.idTicketDetails = id_ticket_details;
        this.idTicket = id_ticket;
        this.idProduct = id_product;
        this.price = price;
        this.quantity = quantity;
    }

    public TicketDetails() {

    }


    public Long getIdTicket() {
        return idTicket;
    }

    public Long getIdProduct() {
        return idProduct;
    }

    public void setIdTicket(Long idTicket) {
        this.idTicket = idTicket;
    }

    public void setIdProduct(Long idProduct) {
        this.idProduct = idProduct;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
}
