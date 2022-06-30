package com.example.arquitecturaweb_tp5.web;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ControllerIndex {

    @GetMapping("/index")
    public String inicio(Model model){
        return "index";
    }
}