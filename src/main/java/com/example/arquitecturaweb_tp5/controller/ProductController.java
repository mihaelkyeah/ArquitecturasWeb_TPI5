package com.example.arquitecturaweb_tp5.controller;

import com.example.arquitecturaweb_tp5.dto.ProductDTO;
import com.example.arquitecturaweb_tp5.model.Client;
import com.example.arquitecturaweb_tp5.model.Product;
import com.example.arquitecturaweb_tp5.servicios.ProductService;
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
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService ps;

    @Operation(summary = "Retorna una lista de todos los productos")
    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Product> allProducts() {
        return ps.listProducts();
    }

    @Operation (summary = "Retorna un producto segun el id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Producto encontrado",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Product.class)) }),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado",
                    content = @Content) })
    @GetMapping(value = "/getProductById/id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Product> getProductById(@PathVariable(value = "id") Long id) {
        Optional<Product> product = this.ps.findProduct(id);
        if (product.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(product.get(), HttpStatus.OK);
        }
    }

    @Operation(summary = "Retorna el productoDTO del producto mas vendido")
    @GetMapping(value = "/mas-vendido", produces = MediaType.APPLICATION_JSON_VALUE)
    public ProductDTO masVendido() {
        return ps.masVendido();
    }

    @Operation (summary = "Guarda un Producto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Producto agregado",
                    content = { @Content}),
            @ApiResponse(responseCode = "406", description = "Producto no agregado",
                    content = @Content) })
    @PostMapping("/add")
    public ResponseEntity<?> postProduct(@RequestBody Product p) {
        if(this.ps.existProduct(p.getName()) != null){
            if (this.ps.save(p))
                return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @Operation (summary = "Borra un Producto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Producto eliminado",
                    content = { @Content}),
            @ApiResponse(responseCode = "406", description = "Producto no Encontrado",
            content = @Content)
    })
    @DeleteMapping("/deleteByID/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable(value = "id") Long id) {
        Optional<Product> product = this.ps.findProduct(id);
        if (product.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        this.ps.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation (summary = "Actualiza un Producto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Producto actualizado",
                    content = { @Content}),
            @ApiResponse(responseCode = "406", description = "Producto no actualizado",
                    content = @Content) })
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
