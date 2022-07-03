package com.example.arquitecturaweb_tp5.repository;

import com.example.arquitecturaweb_tp5.model.TicketDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketDetailsRepository extends JpaRepository<TicketDetails, Long> {

    /**
     * Elimina el detalle de un ticket por su id
     * @param id
     */
    @Query(value = "DELETE FROM TicketDetails td WHERE td.idTicket = :id")
    public void deleteAllByIdTicket( @Param("id") Long id);

    @Query(value="SELECT COALESCE(SUM(td.quantity),0) FROM TicketDetails td JOIN Ticket t ON t.idTicket = td.idTicket WHERE t.idClient = :idClient AND td.idProduct = :idProduct AND t.date LIKE %:dateLike%")
    float getCountSoldStartsWith(@Param("idClient") Long idClient,@Param("idProduct") Long idProduct, @Param("dateLike") String dateLike);

    @Query(value = "SELECT  td FROM TicketDetails td WHERE td.idTicket = :id")
    List<TicketDetails> findDetailByIdTicket(Long id);
}
