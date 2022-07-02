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
    public ProductReporitory product;
    @Autowired
    public TicketDetailsRepository tdr;

    public ProductService() {
        super();
    }

    /**
     * Retorna la lista de Product
     * @return
     */
    @Transactional(readOnly = true)
    public List<Product> listProducts() {
        return this.product.findAll();
    }

    /**
     * Persiste un Product
     * @param p
     * @return T/F si el Product fue persistido
     */
    @Transactional
    public Boolean save(Product p) {
        if (this.product.getByName(p.getName()) != null)
            return false;
        this.product.saveAndFlush(p);
        return true;
    }

    /**
     * Elimina un Product segun el id
     * @param id
     */
    @Transactional
    public void delete(Long id) {
        this.product.deleteById(id);
    }

    /**
     * Retorna un Product segun el id
     * @param id
     * @return
     */
    @Transactional(readOnly = true)
    public Optional<Product> findProduct(Long id) {
        return this.product.findById(id);
    }

    /**
     * Retorna el ProductDTO del Product mas vendido
     * @return
     */
    @Transactional(readOnly = true)
    public ProductDTO masVendido() {
        ProductDTO p = this.product.masVendido().get(0);
        return p;
    }

    @Transactional(readOnly = true)
    public Product existProduct(String name) {
        return this.product.getByName(name);
    }

    @Transactional(readOnly = true)
    public boolean buyLimit(Long idCliente, Long idProduct,String dateNow, int productLimit) {

        Float value = this.tdr.getCountSoldStartsWith(idCliente,idProduct, dateNow);

        if(value != null){
            if(value >= productLimit)
                return true;
        }
        return false;
    }
}
