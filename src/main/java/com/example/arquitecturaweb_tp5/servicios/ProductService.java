package com.example.arquitecturaweb_tp5.servicios;

import com.example.arquitecturaweb_tp5.dto.ProductDTO;
import com.example.arquitecturaweb_tp5.model.Product;
import com.example.arquitecturaweb_tp5.repository.ProductReporitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    public ProductReporitory product;

    public ProductService() {
        super();
    }

    @Transactional(readOnly = true)
    public List<Product> listProducts() {
        return this.product.findAll();
    }

    @Transactional
    public Boolean save(Product p) {
        if (this.product.getByName(p.getName()) != null)
            return false;
        this.product.saveAndFlush(p);
        return true;
    }

    @Transactional
    public void delete(Long id) {
        this.product.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Product> findProduct(Long id) {
        return this.product.findById(id);
    }
    @Transactional(readOnly = true)
    public ProductDTO masVendido() {
        ProductDTO p = this.product.masVendido().get(0);
        return p;
    }
}
