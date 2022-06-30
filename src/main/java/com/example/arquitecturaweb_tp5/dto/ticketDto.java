package com.example.arquitecturaweb_tp5.dto;

import com.example.arquitecturaweb_tp5.model.Ticket;
import com.example.arquitecturaweb_tp5.model.TicketDetails;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ticketDto {

    private List<TicketDetails> tiketDetails;
    private Ticket ticket;

    public ticketDto(List<TicketDetails> t, Ticket tik) {
        this.tiketDetails = new ArrayList<TicketDetails>();

        this.ticket = tik;
        this.tiketDetails = t;
    }

    public List<TicketDetails> getTiketDetails() {
        return tiketDetails;
    }

    public void setTiketDetails(List<TicketDetails> tiketDetails) {
        this.tiketDetails = tiketDetails;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }
}
