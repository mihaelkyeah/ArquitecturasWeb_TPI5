package com.example.arquitecturaweb_tp5.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.example.arquitecturaweb_tp5.dto.ticketDto;
import com.example.arquitecturaweb_tp5.model.TicketDetails;
import com.example.arquitecturaweb_tp5.servicios.ProductService;
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

    @Autowired
    private TicketDetailsService tds;
    @Autowired
    private ProductService ps;

    private  List<TicketDetails> lista = new ArrayList<TicketDetails>();

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Ticket> allTickets() {
        return ts.listSold();
    }

    @PostMapping(value="/add", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> saveTicket(@RequestBody ticketDto tdto)  {

        this.lista=tdto.getTiketDetails();
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

        if (this.ts.save(tdto.getTicket())){
            Long idCliente = tdto.getTicket().getIdClient();
            String date = tdto.getTicket().getDate();

            idTicket = this.ts.idTicket(idCliente,date);//aca se rompe

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

    @GetMapping("/getTicketById/cliente/{id}/date/{date}")
    public Long getIdTicket(@PathVariable(value = "id") Long id, @PathVariable(value = "date") String date) {
        Long idTicket = this.ts.idTicket(id,date);
        return idTicket;
    }

    @GetMapping(value = "/date/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Ticket> getTicketDate(@PathVariable(value = "date") String d) {
        List<Ticket> ticketDate = this.ts.getTicketDate(d);
        return ticketDate;
    }

    @DeleteMapping("/deleteByID/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable(value = "id") Long id) {
        this.ts.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@RequestBody Ticket p, @PathVariable Long id) {
        Long ticket = this.ts.idTicket(id, p.getDate());
        if(ticket != null){
            if (this.ts.save(p))
                return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

}
