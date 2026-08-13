package com.sreyas.mediaclub.controller;

import com.sreyas.mediaclub.dto.ApplicationRequest;
import com.sreyas.mediaclub.dto.ApplicationResponse;
import com.sreyas.mediaclub.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<ApplicationResponse> submitApplication(@Valid @RequestBody ApplicationRequest request) {
        ApplicationResponse response = applicationService.submitApplication(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
