package com.sreyas.mediaclub.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI sreyasMediaClubOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Sreyas Media Club REST API")
                        .description("Backend REST APIs for Sreyas Institute of Engineering and Technology Media Club")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Sreyas Media Club Engineering")
                                .email("mediaclub@sreyas.ac.in")));
    }
}
