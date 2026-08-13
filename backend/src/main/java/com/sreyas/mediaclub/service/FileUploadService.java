package com.sreyas.mediaclub.service;

import com.sreyas.mediaclub.service.storage.StorageService;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FileUploadService {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    private static final List<String> ALLOWED_MIME_TYPES = Arrays.asList(
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif"
    );
    private static final List<String> FORBIDDEN_EXTENSIONS = Arrays.asList(
            "exe", "php", "jsp", "sh", "bat", "js", "py", "html", "htm", "svg"
    );

    private final Tika tika = new Tika();
    private final StorageService localStorageService;
    private final StorageService s3StorageService;

    @Value("${STORAGE_PROVIDER:${app.storage.provider:local}}")
    private String storageProvider;

    public FileUploadService(
            @Qualifier("localStorageService") StorageService localStorageService,
            @Qualifier("s3StorageService") StorageService s3StorageService) {
        this.localStorageService = localStorageService;
        this.s3StorageService = s3StorageService;
    }

    private StorageService getActiveStorageService() {
        if ("s3".equalsIgnoreCase(storageProvider) || "cloud".equalsIgnoreCase(storageProvider) || "aws".equalsIgnoreCase(storageProvider)) {
            return s3StorageService;
        }
        return localStorageService;
    }

    public String storeFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty.");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds maximum allowed limit of 5MB.");
        }

        // 1. Path Traversal & Filename Inspection
        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null && originalFilename.contains("..")) {
            throw new IllegalArgumentException("Invalid filename containing path traversal characters.");
        }

        // 2. Extension Checking
        String fileExtension = getFileExtension(originalFilename).toLowerCase();
        if (FORBIDDEN_EXTENSIONS.contains(fileExtension)) {
            throw new IllegalArgumentException("Executable and script files are strictly forbidden.");
        }

        // 3. Magic Byte Inspection via Apache Tika (do not trust client MIME type alone)
        String detectedMimeType;
        try {
            detectedMimeType = tika.detect(file.getInputStream());
            if (!ALLOWED_MIME_TYPES.contains(detectedMimeType.toLowerCase())) {
                throw new IllegalArgumentException("Invalid file format. Detected: " + detectedMimeType + ". Only JPEG, PNG, WEBP, and GIF images are allowed.");
            }
        } catch (IOException e) {
            throw new IllegalArgumentException("Could not verify file signature.");
        }

        // 4. Generate Safe Random UUID Filename
        String safeFilename = UUID.randomUUID().toString() + "." + (fileExtension.isEmpty() ? "png" : fileExtension);

        // 5. Delegate Storage Operation to Active Storage Provider
        return getActiveStorageService().store(file, safeFilename, detectedMimeType);
    }

    public void deleteFile(String fileUrl) {
        if (fileUrl != null && !fileUrl.trim().isEmpty()) {
            getActiveStorageService().delete(fileUrl);
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) return "";
        return filename.substring(filename.lastIndexOf(".") + 1);
    }
}
