package com.example.arquitecturaweb_tp5.controller;


import com.example.arquitecturaweb_tp5.model.Ticket;
import com.example.arquitecturaweb_tp5.model.TicketDetails;
import com.example.arquitecturaweb_tp5.servicios.TicketDetailsService;
import com.example.arquitecturaweb_tp5.servicios.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ticketDetails")
public class TicketDetailsController {

    @Autowired
    private TicketDetailsService tds;

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TicketDetails> allTicketsDetails() {
        return tds.listSold();
    }

    @PostMapping("/add")
    public ResponseEntity<?> saveTicket(@RequestBody TicketDetails s) {
        if (this.tds.save(s))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @DeleteMapping("/deleteByIdTicket/{id}")
    public ResponseEntity<?> deleteAllByIdTicket(@PathVariable(value = "id") Long id) {
       //TODO verificar que exista id ticket

        this.tds.deleteByIdTicket(id);
            return new ResponseEntity<>(HttpStatus.OK);

        //TODO else  return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);

        //TODO PUT
    }
}
