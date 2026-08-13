package com.sreyas.mediaclub.service.storage;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    /**
     * Stores a validated file and returns its accessible public URL or URI.
     */
    String store(MultipartFile file, String filename, String mimeType);

    /**
     * Deletes a file from storage given its public URL or key.
     */
    void delete(String fileUrl);
}
