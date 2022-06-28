package com.example.arquitecturaweb_tp5.repository;

import com.example.arquitecturaweb_tp5.model.Product;
import com.example.arquitecturaweb_tp5.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    // agregar funciones personalizadas

    @Query(value = "SELECT t.idTicket FROM Ticket t WHERE t.idClient  = :idCliente AND t.date = :date")
    public Long getSpecificTicket(Long idClient, String date);

}
