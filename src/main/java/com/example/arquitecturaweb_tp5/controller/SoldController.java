package com.example.arquitecturaweb_tp5.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.arquitecturaweb_tp5.model.Sold;
import com.example.arquitecturaweb_tp5.servicios.SoldService;

@RestController
@RequestMapping("/Sold")
public class SoldController {

    @Autowired
    private SoldService ss;

    @RequestMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Sold> allClients() {
        return ss.listSold();
    }

    @PostMapping("/add")
    public ResponseEntity<?> postBook(@RequestBody Sold s) {
        if (this.ss.save(s))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

}
