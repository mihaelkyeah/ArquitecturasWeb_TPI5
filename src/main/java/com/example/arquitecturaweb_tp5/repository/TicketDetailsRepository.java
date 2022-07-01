package com.example.arquitecturaweb_tp5.repository;

import com.example.arquitecturaweb_tp5.model.TicketDetails;
import org.hibernate.sql.Select;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TicketDetailsRepository extends JpaRepository<TicketDetails, Long> {

    /**
     * Elimina el detalle de un ticket por su id
     * @param id
     */

    @Query(value = "DELETE FROM TicketDetails td WHERE td.idTicket = :id")
    public void deleteAllByIdTicket(Long id);



    @Query(value="SELECT SUM(td.quantity) FROM TicketDetails td " +
            "JOIN Ticket t WHERE t.idTicket = td.idTicket " +
            "AND t.idClient = :idClient AND td.idProduct = :idProduct AND t.date LIKE :dateLike%")
    int getCountSoldStartsWith(@Param("idClient") Long idClient,@Param("idProduct") Long idProduct, @Param("dateLike") String dateLike);

}
