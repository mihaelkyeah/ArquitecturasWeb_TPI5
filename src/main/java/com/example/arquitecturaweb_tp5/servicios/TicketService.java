package com.example.arquitecturaweb_tp5.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.arquitecturaweb_tp5.model.Ticket;
import com.example.arquitecturaweb_tp5.repository.TicketRepository;

@Service
public class TicketService {

    @Autowired
    public TicketRepository tr;

    @Transactional(readOnly = true)
    public List<Ticket> listSold() {
        return this.tr.findAll();
    }

    @Transactional
    public Ticket save(Ticket i) {
        return  this.tr.saveAndFlush(i);
    }

    @Transactional
    public void delete(Long id) {
        this.tr.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Ticket> findSold(Long id) {
        return this.tr.findById(id);
    }


    @Transactional(readOnly = true)
    public Long idTicket(Long id, String date) {
        return  this.tr.getSpecificTicket(id, date);

    }
    @Transactional(readOnly = true)
    public List<Ticket> getTicketDate(String date) {return this.tr.getTicketDate(date);}

}
