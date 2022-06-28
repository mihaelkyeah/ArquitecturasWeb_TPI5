package com.example.arquitecturaweb_tp5.servicios;

import com.example.arquitecturaweb_tp5.model.Ticket;
import com.example.arquitecturaweb_tp5.model.TicketDetails;
import com.example.arquitecturaweb_tp5.repository.TicketDetailsRepository;
import com.example.arquitecturaweb_tp5.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TicketDetailsService {

    @Autowired
    public TicketDetailsRepository td;

    @Transactional(readOnly = true)
    public List<TicketDetails> listSold() {
        return this.td.findAll();
    }

    @Transactional
    public Boolean save(TicketDetails i) {
        this.td.saveAndFlush(i);
        return true;
    }

    @Transactional
    public void deleteByIdTicket(Long id) {
         this.td.deleteAllByIdTicket(id);
    }

    @Transactional(readOnly = true)
    public Optional<TicketDetails> findSold(Long id) {
        return this.td.findById(id);
    }
}
