package com.sreyas.mediaclub.service;

import com.sreyas.mediaclub.dto.JwtResponse;
import com.sreyas.mediaclub.dto.LoginRequest;
import com.sreyas.mediaclub.entity.User;
import com.sreyas.mediaclub.repository.UserRepository;
import com.sreyas.mediaclub.security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtils.generateToken(user.getUsername(), user.getRole().name());

        return new JwtResponse(token, user.getUsername(), user.getEmail(), user.getRole().name());
    }
}
