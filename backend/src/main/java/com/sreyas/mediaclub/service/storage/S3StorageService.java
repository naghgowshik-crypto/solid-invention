package com.sreyas.mediaclub.service.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3ClientBuilder;
import software.amazon.awssdk.services.s3.model.*;

import java.net.URI;

@Service("s3StorageService")
public class S3StorageService implements StorageService {

    @Value("${STORAGE_BUCKET:${app.storage.s3.bucket:sreyas-media-club-uploads}}")
    private String bucketName;

    @Value("${STORAGE_REGION:${app.storage.s3.region:us-east-1}}")
    private String region;

    @Value("${STORAGE_ENDPOINT:${app.storage.s3.endpoint:}}")
    private String customEndpoint;

    @Value("${STORAGE_ACCESS_KEY:${app.storage.s3.access-key:}}")
    private String accessKey;

    @Value("${STORAGE_SECRET_KEY:${app.storage.s3.secret-key:}}")
    private String secretKey;

    private S3Client getS3Client() {
        S3ClientBuilder builder = S3Client.builder()
                .region(Region.of(region));

        if (accessKey != null && !accessKey.trim().isEmpty() && secretKey != null && !secretKey.trim().isEmpty()) {
            builder.credentialsProvider(StaticCredentialsProvider.create(
                    AwsBasicCredentials.create(accessKey.trim(), secretKey.trim())
            ));
        }

        if (customEndpoint != null && !customEndpoint.trim().isEmpty()) {
            builder.endpointOverride(URI.create(customEndpoint.trim()));
        }

        return builder.build();
    }

    @Override
    public String store(MultipartFile file, String filename, String mimeType) {
        try (S3Client s3Client = getS3Client()) {
            String key = "uploads/" + filename;

            PutObjectRequest putOb = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(mimeType)
                    .build();

            s3Client.putObject(putOb, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            if (customEndpoint != null && !customEndpoint.trim().isEmpty()) {
                return customEndpoint.replaceAll("/+$", "") + "/" + bucketName + "/" + key;
            } else {
                return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + key;
            }
        } catch (Exception ex) {
            throw new RuntimeException("Could not store file to S3 cloud storage.", ex);
        }
    }

    @Override
    public void delete(String fileUrl) {
        if (fileUrl == null || fileUrl.trim().isEmpty()) return;

        try (S3Client s3Client = getS3Client()) {
            String key = extractKeyFromUrl(fileUrl);
            if (key == null) return;

            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
            System.out.println(">>> S3StorageService: Deleted object " + key + " from bucket " + bucketName);
        } catch (Exception ex) {
            System.err.println("S3StorageService deletion warning: " + ex.getMessage());
        }
    }

    private String extractKeyFromUrl(String fileUrl) {
        if (fileUrl.contains("/uploads/")) {
            return fileUrl.substring(fileUrl.indexOf("uploads/"));
        }
        return null;
    }
}
