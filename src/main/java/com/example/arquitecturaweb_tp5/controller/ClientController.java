package com.example.arquitecturaweb_tp5.controller;
import com.example.arquitecturaweb_tp5.dto.TotalComprasPorClienteDTO;
import com.example.arquitecturaweb_tp5.model.Client;
import com.example.arquitecturaweb_tp5.servicios.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
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
@RequestMapping("/client")
public class ClientController {

    @Autowired
    private ClientService cs;

    @Operation (summary = "Retorna todos los clientes")
    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Client> allClients() {
        return cs.listClient();
    }

    @Operation (summary = "Retorna un cliente segun el id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente encontrado",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Client.class)) }),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado",
                    content = @Content) })
    @GetMapping(value = "/getClientById/id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Client> getClientById(@PathVariable(value = "id") Long id) {
        Optional<Client> client = this.cs.findClient(id);
        if (client.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(client.get(), HttpStatus.OK);
        }
    }

    @Operation (summary = "Retorna si un cliente existe")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente encontrado",
                    content = { @Content}),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado",
                    content = @Content) })
    @GetMapping(value = "/ClientExists/id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getClientExists(@PathVariable(value = "id") Long id) {
        Optional<Client> client = this.cs.findClient(id);
        if (client.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(client.get(), HttpStatus.OK);
        }
    }

    @Operation (summary = "Retorna un reporte del total de compras de clientes ordenado DESC")
    @GetMapping(value = "/totalCompras", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TotalComprasPorClienteDTO> totalPurchase(){
        return this.cs.reporteTotalCompras();
    }


    @Operation (summary = "Guarda un Cliente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente agregado",
                    content = { @Content}),
            @ApiResponse(responseCode = "406", description = "Cliente no agregado",
                    content = @Content) })
    @PostMapping("/add")
    public ResponseEntity<?> postClient(@RequestBody Client c) {
        if (this.cs.save(c))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @Operation (summary = "Borra un Cliente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente eliminado",
                    content = { @Content}),
            @ApiResponse(responseCode = "406", description = "Cliente no Existe",
            content = @Content) })
    @DeleteMapping("/deleteByID/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable(value = "id") Long id) {
        Optional<Client> client = this.cs.findClient(id);
        if (client.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        this.cs.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation (summary = "Actualiza un Cliente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente actualizado",
                    content = { @Content}),
            @ApiResponse(responseCode = "406", description = "Cliente no actualizado",
                    content = @Content) })
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateClient(@RequestBody Client c, @PathVariable Long id) {
        Optional<Client> client = this.cs.findClient(id);
        if(!client.isEmpty()){
            c.setIdClient(id);
            if (this.cs.update(c))
                return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }
}
