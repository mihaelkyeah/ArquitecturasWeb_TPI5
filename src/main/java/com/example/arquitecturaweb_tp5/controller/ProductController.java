package com.example.arquitecturaweb_tp5.controller;

import com.example.arquitecturaweb_tp5.dto.ProductDTO;
import com.example.arquitecturaweb_tp5.model.Client;
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

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Product> allProducts() {
        return ps.listProducts();
    }

    @GetMapping(value = "/getProductById/id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Product> getProductById(@PathVariable(value = "id") Long id) {
        Optional<Product> product = this.ps.findProduct(id);
        if (product.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(product.get(), HttpStatus.OK);
        }
    }

    @GetMapping(value = "/mas-vendido", produces = MediaType.APPLICATION_JSON_VALUE)
    public ProductDTO masVendido() {
        return ps.masVendido();
    }

    @PostMapping("/add")
    public ResponseEntity<?> postProduct(@RequestBody Product p) {
        if (this.ps.save(p))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @DeleteMapping("/deleteByID/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable(value = "id") Long id) {
        //TODO verificar que exista id ticket

        this.ps.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);

        //TODO else  return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);

        //TODO PUT
    }
        @PutMapping("/update/{id}")
        public ResponseEntity<?> updateProduct(@RequestBody Product p, @PathVariable Long id) {
            Optional<Product> product = this.ps.findProduct(id);
            if(product != null){
                if (this.ps.save(p))
                    return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
}
