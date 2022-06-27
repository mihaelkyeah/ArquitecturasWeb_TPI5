package com.example.arquitecturaweb_tp5.repository;

import com.example.arquitecturaweb_tp5.model.Sold;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SoldRepository extends JpaRepository<Sold, Long> {

    // agregar funciones personalizadas

}
