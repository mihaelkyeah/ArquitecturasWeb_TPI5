package com.example.arquitecturaweb_tp5.controller;

import java.util.List;

import com.example.arquitecturaweb_tp5.servicios.TicketDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.arquitecturaweb_tp5.model.Ticket;
import com.example.arquitecturaweb_tp5.servicios.TicketService;

@RestController
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private TicketService ts;

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Ticket> allTickets() {
        return ts.listSold();
    }

    @PostMapping("/add")
    public Long saveTicket(@RequestBody Ticket s) {
        if (this.ts.save(s)){
            Long idTicket = this.getIdTicket(s.getIdClient(),s.getDate());
            return idTicket;
        }
        return null;
    }

    @GetMapping("/getTicketById/cliente/{id}/date/{date}")
    public Long getIdTicket(@PathVariable(value = "id") Long id, @PathVariable(value = "date") String date) {
        Long idTicket = this.ts.idTicket(id,date);
        return idTicket;
    }

    //TODO DELETE

    //TODO PUT

}
