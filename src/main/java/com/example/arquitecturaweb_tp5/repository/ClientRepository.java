package com.example.arquitecturaweb_tp5.repository;

import com.example.arquitecturaweb_tp5.dto.totalComprasPorClienteDTO;
import com.example.arquitecturaweb_tp5.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query(value = "SELECT c FROM Client c WHERE c.email = :email")
    public Client getByEmail(String email);

    @Query("SELECT new com.example.arquitecturaweb_tp5.dto.totalComprasPorClienteDTO(c.name, c.lastName, sum(t.total)) FROM Client c JOIN Ticket t ON c.IdClient = t.idClient GROUP BY c.name, c.lastName")
    public List<totalComprasPorClienteDTO> reporteTotales();
}
