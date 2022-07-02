package com.example.arquitecturaweb_tp5.cvs;

import com.example.arquitecturaweb_tp5.model.Client;
import com.example.arquitecturaweb_tp5.model.Product;
import com.example.arquitecturaweb_tp5.model.Ticket;
import com.example.arquitecturaweb_tp5.model.TicketDetails;
import com.example.arquitecturaweb_tp5.servicios.ClientService;
import com.example.arquitecturaweb_tp5.servicios.ProductService;
import com.example.arquitecturaweb_tp5.servicios.TicketDetailsService;
import com.example.arquitecturaweb_tp5.servicios.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.FileReader;
import java.io.IOException;

@RestController
@RequestMapping("/api/LoadCVS")
public class LoadCVS {

    @Autowired
    private ProductService ps;
    @Autowired
    private ClientService cs;
    @Autowired
    private TicketService ts;
    @Autowired
    private TicketDetailsService tds;

    @Operation(summary = "Carga la base de datos con datos genericos para test de la api")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Base de Datos Actualizada",
                    content = { @Content}),
            @ApiResponse(responseCode = "406", description = "Se Cancela la Operacion, Se encontraron Datos similares",
                    content = @Content) })
    @GetMapping(value = "/load", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> allProducts() throws IOException {

        CSVParser parser = CSVFormat.DEFAULT.withHeader().parse(new FileReader("data/Product.csv"));
        for (CSVRecord row : parser) {
            Product p = new Product(
                        Long.valueOf(row.get("id")),
                        row.get("name"),
                        row.get("description"),
                        Float.valueOf(row.get("price")),
                        Float.valueOf(row.get("stock"))
            );
           if (!ps.save(p)){
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        }

        parser = CSVFormat.DEFAULT.withHeader().parse(new FileReader("data/Clients.csv"));
        for (CSVRecord row : parser) {
            Client c = new Client(
                    Long.valueOf(row.get("id")),
                    row.get("name"),
                    row.get("last_name"),
                    row.get("email")
            );
            if (!cs.save(c)){
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        }

        parser = CSVFormat.DEFAULT.withHeader().parse(new FileReader("data/Ticket.csv"));
        for (CSVRecord row : parser) {
            Ticket t = new Ticket(
                    Long.valueOf(row.get("id_ticket")),
                    String.valueOf(row.get("date")),
                    Long.valueOf(row.get("id_client")),
                    Float.valueOf(row.get("total"))
            );
            if (ts.save(t)==null){
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        }

       parser = CSVFormat.DEFAULT.withHeader().parse(new FileReader("data/Ticket_Details.csv"));
        for (CSVRecord row : parser) {
            TicketDetails t = new TicketDetails(
                    Long.valueOf(row.get("id_tiket_details")),
                    Long.valueOf(row.get("id_ticket")),
                    Long.valueOf(row.get("id_product")),
                    Float.valueOf(row.get("price")),
                    Float.valueOf(row.get("quantity"))
            );
            if (!tds.save(t)){
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}


