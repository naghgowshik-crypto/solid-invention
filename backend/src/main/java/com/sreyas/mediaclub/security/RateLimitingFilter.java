package com.sreyas.mediaclub.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private final Map<String, Bucket> loginBuckets = new ConcurrentHashMap<>();
    private final Map<String, Bucket> formBuckets = new ConcurrentHashMap<>();

    private Bucket createLoginBucket() {
        Bandwidth limit = Bandwidth.builder()
                .capacity(5)
                .refillGreedy(5, Duration.ofMinutes(1))
                .build();
        return Bucket.builder().addLimit(limit).build();
    }

    private Bucket createFormBucket() {
        Bandwidth limit = Bandwidth.builder()
                .capacity(5)
                .refillGreedy(5, Duration.ofHours(1))
                .build();
        return Bucket.builder().addLimit(limit).build();
    }

    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty() || "unknown".equalsIgnoreCase(xfHeader)) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();
        String clientIP = getClientIP(request);

        // 1. Rate Limit Authentication Login
        if ("/api/auth/login".equalsIgnoreCase(path) && "POST".equalsIgnoreCase(method)) {
            Bucket bucket = loginBuckets.computeIfAbsent(clientIP, k -> createLoginBucket());
            if (!bucket.tryConsume(1)) {
                sendRateLimitResponse(request, response, "Too many login attempts. Please try again in a few minutes.");
                return;
            }
        }

        // 2. Rate Limit Public Form Submissions
        if (("POST".equalsIgnoreCase(method) && "/api/applications".equalsIgnoreCase(path)) ||
            ("POST".equalsIgnoreCase(method) && "/api/contact".equalsIgnoreCase(path))) {
            Bucket bucket = formBuckets.computeIfAbsent(clientIP, k -> createFormBucket());
            if (!bucket.tryConsume(1)) {
                sendRateLimitResponse(request, response, "Too many form submissions. Please try again later.");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private void sendRateLimitResponse(HttpServletRequest request, HttpServletResponse response, String message) throws IOException {
        String origin = request.getHeader("Origin");
        if (origin != null && !origin.isEmpty()) {
            response.setHeader("Access-Control-Allow-Origin", origin);
            response.setHeader("Access-Control-Allow-Credentials", "true");
        } else {
            response.setHeader("Access-Control-Allow-Origin", "*");
        }
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        String json = String.format(
                "{\"timestamp\":\"%s\",\"status\":429,\"message\":\"%s\"}",
                LocalDateTime.now().toString(),
                message
        );
        response.getWriter().write(json);
    }
}
