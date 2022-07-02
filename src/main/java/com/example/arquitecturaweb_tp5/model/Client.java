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

    public Client(Long id, String name, String lastName, String email) {
        this.IdClient = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
    }

    public Client() {

    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getIdClient() {
        return this.IdClient;
    }

}
