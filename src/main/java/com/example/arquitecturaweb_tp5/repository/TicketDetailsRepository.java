package com.example.arquitecturaweb_tp5.repository;

import com.example.arquitecturaweb_tp5.model.Product;
import com.example.arquitecturaweb_tp5.model.Ticket;
import com.example.arquitecturaweb_tp5.model.TicketDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TicketDetailsRepository extends JpaRepository<TicketDetails, Long> {

    @Query(value = "DELETE FROM TicketDetails td WHERE td.idTicket = :id")
    public void deleteAllByIdTicket(Long id);


}
