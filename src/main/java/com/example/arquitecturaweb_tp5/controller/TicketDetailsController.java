package com.example.arquitecturaweb_tp5.controller;


import com.example.arquitecturaweb_tp5.model.Ticket;
import com.example.arquitecturaweb_tp5.model.TicketDetails;
import com.example.arquitecturaweb_tp5.servicios.TicketDetailsService;
import com.example.arquitecturaweb_tp5.servicios.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ticketDetails")
public class TicketDetailsController {

    @Autowired
    private TicketDetailsService tds;

    @Operation (summary = "Retorna todos los TicketDetails")
    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TicketDetails> allTicketsDetails() {
        return tds.listSold();
    }

    @Operation(summary = "Guarda un TicketDetails")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "TicketDetails agregado",
                    content = { @Content}),
            @ApiResponse(responseCode = "406", description = "TicketDetais no agregado",
                    content = @Content) })
    @PostMapping("/add")
    public ResponseEntity<?> saveTicket(@RequestBody TicketDetails s) {
        if (this.tds.save(s))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @Operation (summary = "Borra un TicketDetails")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "TicketDetails eliminado",
                    content = { @Content}),
    })

    @DeleteMapping("/deleteByIdTicket/{id}")
    public ResponseEntity<?> deleteAllByIdTicket(@PathVariable(value = "id") Long id) {

        this.tds.deleteByIdTicket(id);
            return new ResponseEntity<>(HttpStatus.OK);
        //TODO else  return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @Operation (summary = "Actualiza un TicketDetails")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "TicketDetails actualizado",
                    content = { @Content}),
            @ApiResponse(responseCode = "406", description = "TicketDetails no actualizado",
                    content = @Content) })
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@RequestBody TicketDetails p, @PathVariable Long id) {
        Optional<TicketDetails> ticket = this.tds.findTicketDetail(id);
        if(ticket != null){
            if (this.tds.save(p))
                return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }
}
