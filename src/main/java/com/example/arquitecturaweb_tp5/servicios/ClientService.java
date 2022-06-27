package com.example.arquitecturaweb_tp5.servicios;

import com.example.arquitecturaweb_tp5.model.Client;
import com.example.arquitecturaweb_tp5.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository client;

    public ClientService() {
        super();
    }

    @Transactional(readOnly = true)
    public List<Client> listClient() {
        return this.client.findAll();
    }

    @Transactional
    public boolean save(Client c) {
        if (this.client.getByName(c.getName()) != null) {
            return false;
        }
        this.client.saveAndFlush(c);
        return true;
    };

    @Transactional
    public void delete(Long id) {
        this.client.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Client> findClient(Long id) {
        return this.client.findById(id);
    }

}
