package com.sreyas.mediaclub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sreyas.mediaclub.dto.ApplicationRequest;
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
class ApplicationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void submitApplicationSuccess() throws Exception {
        ApplicationRequest request = ApplicationRequest.builder()
                .fullName("Karthik Sharma")
                .rollNumber("239N1A0505")
                .branch("CSE")
                .year("2nd Year")
                .section("B")
                .email("karthik@sreyas.ac.in")
                .phone("9876543210")
                .preferredTeam("Photography")
                .motivation("I am passionate about event photography and light diffusion.")
                .build();

        mockMvc.perform(post("/api/applications")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.fullName").value("Karthik Sharma"))
                .andExpect(jsonPath("$.status").value("NEW"));
    }

    @Test
    void submitApplicationValidationFailure() throws Exception {
        ApplicationRequest request = ApplicationRequest.builder()
                .fullName("")
                .email("invalid-email")
                .build();

        mockMvc.perform(post("/api/applications")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.fullName").exists())
                .andExpect(jsonPath("$.errors.email").exists());
    }
}
