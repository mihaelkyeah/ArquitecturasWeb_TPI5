package com.example.arquitecturaweb_tp5.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.arquitecturaweb_tp5.dto.TicketCompraDto;
import com.example.arquitecturaweb_tp5.model.Client;
import com.example.arquitecturaweb_tp5.model.TicketDetails;
import com.example.arquitecturaweb_tp5.servicios.ClientService;
import com.example.arquitecturaweb_tp5.servicios.TicketDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    @Autowired
    private TicketDetailsService tds;

    @Autowired
    private ClientService cs;
    private  List<TicketDetails> lista = new ArrayList<TicketDetails>();
    private Ticket ticket = new Ticket();
    private Long idTicket;


    @Operation(summary = "Retorna todos los Ticket")
    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Ticket> allTickets() {
        return ts.listSold();
    }

    @Operation(summary = "Retorna un Ticket segun su ID")
    @GetMapping(value = "/getById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Ticket getTicketById(@PathVariable(value = "id") Long id) {
        return ts.tr.getReferenceById(id);
    }

    @Operation (summary = "Guarda un Ticket y sus TicketDetails")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ticket agregado",
                    content = { @Content}),
            @ApiResponse(responseCode = "406", description = "Ticket no agregado",
                    content = @Content) })
    @PostMapping(value="/add", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> saveTicket(@RequestBody TicketCompraDto tdto)  {
        // Inicializaciones
        this.lista=tdto.getTicketDetails();
        this.ticket = tdto.getTicket();
        // ---------------------------------------------------------
        if(!tds.allProductsValid(this.lista, ticket)) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        //----------------------------------------------------------

        Optional<Client> client = this.cs.findClient(ticket.getIdClient());
        if (client.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        ticket.setDate(this.ts.nowDateSpecific());//pone la fecha actual
        Ticket nuevo = this.ts.save(ticket);
        if (nuevo!=null){
            idTicket = nuevo.getIdTicket();
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }

        //----------------------------------------------------------
        for(TicketDetails tds : lista ){
            tds.setIdTicket(idTicket);
            this.tds.save(tds);
        }//----------------------------------------------------------

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "Retorna un idTicket segun el idClient y la fecha")
    @GetMapping("/getTicketById/cliente/{id}/date/{date}")
    public Long getIdTicket(@PathVariable(value = "id") Long id, @PathVariable(value = "date") String date) {
        Long idTicket = this.ts.idTicket(id,date);
        return idTicket;
    }

    @Operation(summary = "Retorna todos los Ticket de una fecha")
    @GetMapping(value = "/date/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Ticket> getTicketDate(@PathVariable(value = "date") String d) {
        List<Ticket> ticketDate = this.ts.getTicketDate(d);
        return ticketDate;
    }

    @Operation (summary = "Borra un Ticket")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ticket eliminado",
                    content = { @Content}),
    })
    @DeleteMapping("/deleteByID/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable(value = "id") Long id) {
        this.ts.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation (summary = "Actualiza un Ticket")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ticket actualizado",
                    content = { @Content}),
            @ApiResponse(responseCode = "406", description = "Ticket no actualizado",
                    content = @Content) })
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@RequestBody Ticket t, @PathVariable Long id) {
        if( this.ts.existTikext(id)){
            t.setIdTicket(id);
            Ticket save = this.ts.save(t);
            if (save!=null)
                return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

}

