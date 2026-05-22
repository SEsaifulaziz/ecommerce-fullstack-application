package com.developerhubcorporation.e_commerce.backend.design.exception;




import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class ErrorDetails {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String details;
    private Map<String, String> errors; // Key-Value pair for fields (e.g., "email": "Invalid format")

    // Constructor for regular exceptions (like 404 Not Found)
    public ErrorDetails(LocalDateTime timestamp, int status, String error, String message, String details) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.message = message;
        this.details = details;
    }

    // Overloaded constructor for validation exceptions (400 Bad Request)
    public ErrorDetails(LocalDateTime timestamp, int status, String error, String message, String details, Map<String, String> errors) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.message = message;
        this.details = details;
        this.errors = errors;
    }
}
