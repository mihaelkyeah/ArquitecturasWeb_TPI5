package com.example.arquitecturaweb_tp5.web;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class ControllerIndex {

    @GetMapping("/")
    public String inicio(Model model){
        return "index";
    }
}