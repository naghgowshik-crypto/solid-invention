package com.sreyas.mediaclub.service.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service("localStorageService")
public class LocalStorageService implements StorageService {

    @Value("${app.upload.dir:./uploads}")
    private String uploadDir;

    @Override
    public String store(MultipartFile file, String filename, String mimeType) {
        try {
            Path targetDirectory = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(targetDirectory);

            Path targetPath = targetDirectory.resolve(filename).normalize();

            if (!targetPath.startsWith(targetDirectory)) {
                throw new IllegalArgumentException("Target path is outside allowed directory.");
            }

            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + filename;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file locally.", ex);
        }
    }

    @Override
    public void delete(String fileUrl) {
        if (fileUrl == null || !fileUrl.contains("/uploads/")) {
            return;
        }

        try {
            String filename = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
            Path targetDirectory = Paths.get(uploadDir).toAbsolutePath().normalize();
            Path filePath = targetDirectory.resolve(filename).normalize();

            if (filePath.startsWith(targetDirectory) && Files.exists(filePath)) {
                Files.delete(filePath);
                System.out.println(">>> LocalStorageService: Deleted file " + filename);
            }
        } catch (Exception ex) {
            System.err.println("LocalStorageService deletion warning: " + ex.getMessage());
        }
    }
}
