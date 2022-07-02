package com.example.arquitecturaweb_tp5;

import com.example.arquitecturaweb_tp5.model.Client;
import com.example.arquitecturaweb_tp5.model.Product;
import com.example.arquitecturaweb_tp5.servicios.ClientService;
import com.example.arquitecturaweb_tp5.servicios.ProductService;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

@SpringBootApplication
public class Application {
    public static void main(String[] args) throws IOException {
        SpringApplication.run(Application.class, args);
    }
}


