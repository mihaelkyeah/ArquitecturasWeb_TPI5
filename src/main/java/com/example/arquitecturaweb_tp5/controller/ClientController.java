package com.example.arquitecturaweb_tp5.controller;

import com.example.arquitecturaweb_tp5.model.Client;
import com.example.arquitecturaweb_tp5.servicios.ClientService;
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

    @RequestMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Client> allClients() {
        return cs.listClient();
    }

    @RequestMapping(value = "/id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Client> getClientById(@PathVariable(value = "id") Long id) {
        Optional<Client> client = this.cs.findClient(id);
        if (client.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(client.get(), HttpStatus.OK);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> postCliente(@RequestBody Client c) {
        if (this.cs.save(c))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable(value = "id") Long id) {
        this.cs.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
