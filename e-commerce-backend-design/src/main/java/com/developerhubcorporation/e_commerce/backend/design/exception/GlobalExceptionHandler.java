package com.developerhubcorporation.e_commerce.backend.design.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Catch specific ResourceNotFoundExceptions (e.g., product missing)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleResourceNotFoundException(
            ResourceNotFoundException exception, WebRequest webRequest) {

        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                exception.getMessage(),
        webRequest.getDescription(false) // Returns the endpoint URI requested
        );

          return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    // Global Catch-All: Catches any unexpected code crashes (e.g., NullPointer, Database down)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleException(
            Exception exception, WebRequest webRequest) {

        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                exception.getMessage(),
                webRequest.getDescription(false)
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
