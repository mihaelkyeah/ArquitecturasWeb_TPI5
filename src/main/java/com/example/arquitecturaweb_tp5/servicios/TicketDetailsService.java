package com.example.arquitecturaweb_tp5.servicios;

import com.example.arquitecturaweb_tp5.model.Product;
import com.example.arquitecturaweb_tp5.model.Ticket;
import com.example.arquitecturaweb_tp5.model.TicketDetails;
import com.example.arquitecturaweb_tp5.repository.TicketDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TicketDetailsService {

    @Autowired
    public TicketDetailsRepository td;
    @Autowired
    private ProductService ps;
    @Autowired
    private TicketService ts;

    @Transactional(readOnly = true)
    public List<TicketDetails> listSold() {
        return this.td.findAll();
    }

    /**
     * Persiste un TicketDetails
     * @param i
     * @return
     */
    @Transactional
    public Boolean save(TicketDetails i) {
        ps.restarStock(i.getIdProduct(), i.getQuantity());
        this.td.saveAndFlush(i);
        return true;
    }

    /**
     * Elimina los TicketDetails asociados a un idTicket
     * @param id
     */
    @Transactional
    public void deleteByIdTicket(Long id) {
         this.td.deleteAllByIdTicket(id);
    }

    /**
     * Retorna un TicketDetails por id
     * @param id
     * @return
     */
    @Transactional(readOnly = true)
    public Optional<TicketDetails> findTicketDetail(Long id) {
        return this.td.findById(id);
    }

    /**
     * Si el producto esta vacio return false
     * Si un producto Supera el limite establecido return false
     * @param List<TicketDetails> lista de productos
     * @return boolean
     */
    public boolean allProductsValid(List<TicketDetails> lista, Ticket ticket){
        System.out.println(this.ts.nowDate());
        for (TicketDetails ts : lista ) {
            if(ps.findProduct(ts.getIdProduct()).isEmpty()){
                return false;//Si existe un producto no va a estar vacio
            }
            if(!ps.buyLimit(ticket.getIdClient(),ts.getIdProduct(),this.ts.nowDate(), ts.getQuantity())){
                return false;
            }
            if(!(ps.stockDisponible(ts.getIdProduct()) >= ts.getQuantity()) ){
                return false;
            }
        }
        return true;
    }

}
