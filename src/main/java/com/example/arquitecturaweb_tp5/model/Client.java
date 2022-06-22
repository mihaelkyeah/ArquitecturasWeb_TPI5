package com.example.arquitecturaweb_tp5.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdClient;
    private String name;
    private String lastName;
    private String email;
}
