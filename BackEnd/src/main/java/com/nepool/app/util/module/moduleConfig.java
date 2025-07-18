package com.nepool.app.util.module;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class moduleConfig {
    @Bean
    public BCryptModule bCryptModule() {return new BCryptModule();}

    @Bean(name = "customPageModule")
    public PageModule pageModule() {return new PageModule();}

}
