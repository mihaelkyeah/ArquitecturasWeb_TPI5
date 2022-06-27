package com.example.arquitecturaweb_tp5.repository;

import com.example.arquitecturaweb_tp5.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClientRepository extends JpaRepository<Client, Long> {

    // agregar funciones personalizadas

    @Query(value = "SELECT c FROM Client c WHERE c.name = :name")
    public Client getByName(String name);

}
