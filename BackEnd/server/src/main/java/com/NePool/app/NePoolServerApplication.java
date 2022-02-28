package com.NePool.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class NePoolServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(NePoolServerApplication.class, args);
	}

}
