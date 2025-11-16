package com.example.safespace_back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class SafespaceBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(SafespaceBackApplication.class, args);
	}

}
