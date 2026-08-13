package com.sreyas.mediaclub.controller;

import com.sreyas.mediaclub.service.FileUploadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/media")
public class FileUploadController {

    private final FileUploadService fileUploadService;

    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadMediaFile(@RequestParam("file") MultipartFile file) {
        String fileUrl = fileUploadService.storeFile(file);
        Map<String, String> response = new HashMap<>();
        response.put("url", fileUrl);
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }
}
