package com.example.safespace_back.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class TestController {
    @GetMapping("/psychologist")
    public String psychologist() {
        return "psychologist";
    }

    @GetMapping("/student")
    public String student() {
        return "student";
    }
}
