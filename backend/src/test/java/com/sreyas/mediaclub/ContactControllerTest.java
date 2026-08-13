package com.sreyas.mediaclub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sreyas.mediaclub.dto.ContactMessageRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void submitContactMessageSuccess() throws Exception {
        ContactMessageRequest request = ContactMessageRequest.builder()
                .name("Ananya")
                .email("ananya@sreyas.ac.in")
                .subject("Short Film Collaboration")
                .message("We would like to request media coverage for our technical symposium.")
                .build();

        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("Ananya"));
    }
}
