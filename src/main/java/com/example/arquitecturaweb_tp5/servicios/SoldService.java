package com.example.arquitecturaweb_tp5.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.arquitecturaweb_tp5.model.Sold;
import com.example.arquitecturaweb_tp5.repository.SoldRepository;

@Service
public class SoldService {

    @Autowired
    public SoldRepository sold;

    @Transactional(readOnly = true)
    public List<Sold> listSold() {
        return this.sold.findAll();
    }

    @Transactional
    public Boolean save(Sold i) {
        this.sold.saveAndFlush(i);
        return true;
    }

    @Transactional
    public void delete(Long id) {
        this.sold.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Sold> findSold(Long id) {
        return this.sold.findById(id);
    }
}
