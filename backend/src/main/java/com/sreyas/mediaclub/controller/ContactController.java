package com.sreyas.mediaclub.controller;

import com.sreyas.mediaclub.dto.ContactMessageRequest;
import com.sreyas.mediaclub.dto.ContactMessageResponse;
import com.sreyas.mediaclub.service.ContactMessageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMessageService contactMessageService;

    public ContactController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    @PostMapping
    public ResponseEntity<ContactMessageResponse> submitContactMessage(@Valid @RequestBody ContactMessageRequest request) {
        ContactMessageResponse response = contactMessageService.saveMessage(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
