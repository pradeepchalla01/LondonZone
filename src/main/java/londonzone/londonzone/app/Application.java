package com.londonzone.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan("com.londonzone.*")
@EnableAutoConfiguration
@EntityScan(basePackages = "com.londonzone.domain")
@EnableJpaRepositories(basePackages = {"com.londonzone.repositories"})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    

}
