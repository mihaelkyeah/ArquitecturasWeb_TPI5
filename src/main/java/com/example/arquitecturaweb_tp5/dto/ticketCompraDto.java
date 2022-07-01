package com.example.arquitecturaweb_tp5.dto;

import com.example.arquitecturaweb_tp5.model.Ticket;
import com.example.arquitecturaweb_tp5.model.TicketDetails;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/***
 * DTO que contiene un ticket y sus detalles
 */
@Data
public class ticketCompraDto {

    private List<TicketDetails> ticketDetails;
    private Ticket ticket;

    public ticketCompraDto(List<TicketDetails> t, Ticket tik) {
        this.ticketDetails = new ArrayList<TicketDetails>();
        this.ticket = tik;
        this.ticketDetails = t;
    }

    public List<TicketDetails> getTicketDetails() {
        return this.ticketDetails;
    }

    public Ticket getTicket() {
        return this.ticket;
    }


}

