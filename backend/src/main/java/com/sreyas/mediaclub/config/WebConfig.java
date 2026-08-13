package com.sreyas.mediaclub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${FRONTEND_URL:${app.frontend.url:http://localhost:3000}}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        List<String> origins = new ArrayList<>();
        origins.add("http://localhost:3000");
        origins.add("http://localhost:3001");
        origins.add("http://localhost:3002");
        origins.add("http://127.0.0.1:3000");
        origins.add("http://127.0.0.1:3001");
        origins.add("http://127.0.0.1:3002");
        origins.add("https://sreyas-media-club-frontend.onrender.com");
        if (frontendUrl != null && !frontendUrl.trim().isEmpty()) {
            String trimmed = frontendUrl.trim();
            origins.add(trimmed);
            if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
                origins.add("https://" + trimmed);
                origins.add("http://" + trimmed);
            }
        }

        registry.addMapping("/api/**")
                .allowedOriginPatterns("https://*.onrender.com", "http://localhost:*", "http://127.0.0.1:*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin")
                .allowCredentials(true)
                .maxAge(3600);
    }



    @Override
    public void addResourceHandlers(org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry registry) {
        java.nio.file.Path uploadDir = java.nio.file.Paths.get("./uploads").toAbsolutePath().normalize();
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadDir.toString() + "/");
    }
}



