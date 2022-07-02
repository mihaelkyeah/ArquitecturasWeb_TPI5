package com.example.arquitecturaweb_tp5.servicios;

import com.example.arquitecturaweb_tp5.dto.ProductDTO;
import com.example.arquitecturaweb_tp5.model.Product;
import com.example.arquitecturaweb_tp5.repository.ProductReporitory;
import com.example.arquitecturaweb_tp5.repository.TicketDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    public ProductReporitory pr;
    @Autowired
    public TicketDetailsRepository tdr;

    private int maxSoldProduct = 3;

    public ProductService() {
        super();
    }

    /**
     * Retorna la lista de Product
     * @return
     */
    @Transactional(readOnly = true)
    public List<Product> listProducts() {
        return this.pr.findAll();
    }

    /**
     * Persiste un Product
     * @param p
     * @return T/F si el Product fue persistido
     */
    @Transactional
    public Boolean save(Product p) {
        if (this.pr.getByName(p.getName()) != null){
            return false;
        }
        this.pr.saveAndFlush(p);
        return true;
    }

    /**
     * Elimina un Product segun el id
     * @param id
     */
    @Transactional
    public void delete(Long id) {
        this.pr.deleteById(id);
    }

    /**
     * Retorna un Product segun el id
     * @param id
     * @return
     */
    @Transactional(readOnly = true)
    public Optional<Product> findProduct(Long id) {
        return this.pr.findById(id);
    }

    /**
     * Retorna el ProductDTO del Product mas vendido
     * @return
     */
    @Transactional(readOnly = true)
    public ProductDTO masVendido() {
        ProductDTO p = this.pr.masVendido().get(0);
        return p;
    }

    /**
     * Busca y Retorna un producto si existe segun su nombre
     * @return
     */
    @Transactional(readOnly = true)
    public Product existProduct(String name) {
        return this.pr.getByName(name);
    }

    /**
     * Retorna si es posible comprar esa cantidad de productos ese dia
     * @return
     */
    @Transactional(readOnly = true)
    public boolean buyLimit(Long idCliente, Long idProduct,String dateNow, float quantityTicket) {
        float value = this.tdr.getCountSoldStartsWith(idCliente,idProduct, dateNow);
        value = value + quantityTicket;
        if(value <= maxSoldProduct){
            return true;
        }
        return false;
    }

    public void restarStock(Long idProduct, float quantity) {
        Product p = this.pr.getById(idProduct);
        p.setStock(p.getStock()-quantity);
        this.pr.save(p);
    }

    public Float stockDisponible(Long idProduct) {
        Product p = this.pr.getById(idProduct);
        return p.getStock();
    }
}
