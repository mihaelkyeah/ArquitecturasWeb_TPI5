package com.example.arquitecturaweb_tp5.servicios;

import java.text.SimpleDateFormat;
import java.util.Calendar;
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

    /**
     * Retorna una lists de Tcket
     * @return
     */
    @Transactional(readOnly = true)
    public List<Ticket> listSold() {
        return this.tr.findAll();
    }

    /**
     * Persiste un Ticket
     * @param i
     * @return
     */
    @Transactional
    public Ticket save(Ticket i) {
        return  this.tr.saveAndFlush(i);
    }

    /**
     * Elimina un Ticket segun el id
     * @param id
     */
    @Transactional
    public void delete(Long id) {
        this.tr.deleteById(id);
    }

    /**
     * Retorna un Ticket segun id
     * @param id
     * @return
     */
    @Transactional(readOnly = true)
    public Optional<Ticket> findSold(Long id) {
        return this.tr.findById(id);
    }

    /**
     * Retorna un Ticket segun fecha y idClient
     * @param id
     * @param date
     * @return
     */
    @Transactional(readOnly = true)
    public Long idTicket(Long id, String date) {
        return  this.tr.getSpecificTicket(id, date);

    }

    /**
     * Retorna una lista de Ticket segun la fecha
     * @param date
     * @return
     */
    @Transactional(readOnly = true)
    public List<Ticket> getTicketDate(String date) {
        date = "%" + date + "%";
        return this.tr.getTicketDate(date);
    }

    public  String nowDate() {
        String DATE_FORMAT_NOW = "yyyy-MM-dd";
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_NOW);
        return sdf.format(cal.getTime());
    }
    public  String nowDateSpecific() {
        String DATE_FORMAT_NOW = "yyyy-MM-dd HH:mm:ss";
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_NOW);
        return sdf.format(cal.getTime());
    }
}
