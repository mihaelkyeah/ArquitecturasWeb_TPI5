package com.example.arquitecturaweb_tp5.controller;

import com.example.arquitecturaweb_tp5.model.Product;
import com.example.arquitecturaweb_tp5.servicios.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService ps;

    @RequestMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Product> allClients() {
        return ps.listProducts();
    }

    @RequestMapping(value = "/id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Product> getClientById(@PathVariable(value = "id") Long id) {
        Optional<Product> product = this.ps.findProduct(id);
        if (product.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(product.get(), HttpStatus.OK);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> postBook(@RequestBody Product p) {
        if (this.ps.save(p))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable(value = "id") Long id) {
        this.ps.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
