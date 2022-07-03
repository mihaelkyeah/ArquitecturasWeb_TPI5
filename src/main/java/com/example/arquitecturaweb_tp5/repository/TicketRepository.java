package com.example.arquitecturaweb_tp5.repository;

import com.example.arquitecturaweb_tp5.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    /**
     * Devuelve un id de un Ticket por la fecha y el id del cliente
     * @param idClient
     * @param date
     * @return
     */
    @Query(value = "SELECT t.idTicket FROM Ticket t WHERE t.idClient = :idCliente AND t.date = :date", nativeQuery = true)
    public Long getSpecificTicket(@Param("idCliente") Long idClient, @Param("date") String date);

    /**
     * Devuelve una lista de Ticket de una fecha dada
     * @param date
     * @return
     */
    @Query(value = "SELECT t FROM Ticket t WHERE t.date LIKE :date")
    List<Ticket> getTicketDate( @Param("date") String date);

}
