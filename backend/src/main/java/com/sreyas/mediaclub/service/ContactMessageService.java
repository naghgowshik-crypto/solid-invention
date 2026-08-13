package com.sreyas.mediaclub.service;

import com.sreyas.mediaclub.dto.ContactMessageRequest;
import com.sreyas.mediaclub.dto.ContactMessageResponse;
import com.sreyas.mediaclub.entity.ContactMessage;
import com.sreyas.mediaclub.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @Transactional
    public ContactMessageResponse saveMessage(ContactMessageRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName().trim())
                .email(request.getEmail().trim())
                .subject(request.getSubject().trim())
                .message(request.getMessage().trim())
                .build();

        ContactMessage saved = contactMessageRepository.save(message);

        return ContactMessageResponse.builder()
                .id(saved.getId())
                .name(saved.getName())
                .email(saved.getEmail())
                .subject(saved.getSubject())
                .message(saved.getMessage())
                .createdAt(saved.getCreatedAt())
                .build();
    }
}
