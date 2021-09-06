package com.rmit.sept.bookmicroservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@EnableConfigurationProperties
@EntityScan(basePackages = {"com.rmit.sept.bookmicroservices.model"})
@SpringBootApplication
public class Ms_book {


    public static void main(String[] args) {
        SpringApplication.run(Ms_book.class, args);
    }

}
