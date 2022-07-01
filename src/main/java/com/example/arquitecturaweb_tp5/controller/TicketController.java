package com.example.arquitecturaweb_tp5.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.example.arquitecturaweb_tp5.dto.ticketCompraDto;
import com.example.arquitecturaweb_tp5.model.TicketDetails;
import com.example.arquitecturaweb_tp5.servicios.ProductService;
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
    private ProductService ps;

    private  List<TicketDetails> lista = new ArrayList<TicketDetails>();

    @Operation(summary = "Retorna todos los Ticket")
    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Ticket> allTickets() {
        return ts.listSold();
    }

    @Operation (summary = "Guarda un Ticket y sus TicketDetails")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ticket agregado",
                    content = { @Content}),
            @ApiResponse(responseCode = "406", description = "Ticket no agregado",
                    content = @Content) })
    @PostMapping(value="/add", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> saveTicket(@RequestBody ticketCompraDto tdto)  {

        this.lista=tdto.getTicketDetails();
        Ticket save = new Ticket();
        boolean correct = true;
        Long idTicket = null;

        for (TicketDetails ts : this.lista ) {
            if(ps.findProduct(ts.getIdProduct()).isEmpty()){//si el producto no existe seteo null
                correct=false;
                //TODO  verificar que el cliente pueda comprar de esos productos
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        //Nota: si esta todo ok con los productos genero el ticket
        save =tdto.getTicket();
        String  date = now();
        save.setDate(date);//pone la fecha actuar
        Ticket nuevo = this.ts.save(save);

        if (nuevo!=null){
            Long idClient = nuevo.getIdClient();
            idTicket = nuevo.getIdTicket();//aca se rompe
            //idTicket = this.getIdTicket(tdto.getTicket().getIdClient(),tdto.getTicket().getDate());
        }

        for(TicketDetails tds : lista ){
            tds.setIdTicket(idTicket);
            this.tds.save(tds);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }


    /*
    @PostMapping("/add")
    public Long saveTicket(@RequestBody Ticket s) {
        if (this.ts.save(s)){
            Long idTicket = this.getIdTicket(s.getIdClient(),s.getDate());
            return idTicket;
        }
        return null;
    }*/

    public  String now() {
        String DATE_FORMAT_NOW = "yyyy-MM-dd HH:mm:ss";
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_NOW);
        return sdf.format(cal.getTime());
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
    public ResponseEntity<?> updateProduct(@RequestBody Ticket p, @PathVariable Long id) {
        Long ticket = this.ts.idTicket(id, p.getDate());
        if(ticket != null){
            Ticket save = this.ts.save(p);
            if (save!=null)
                return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

}
