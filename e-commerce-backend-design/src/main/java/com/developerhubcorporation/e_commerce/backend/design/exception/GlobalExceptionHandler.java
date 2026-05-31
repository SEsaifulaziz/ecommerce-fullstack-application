package com.developerhubcorporation.e_commerce.backend.design.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    //Catch Resource Missing Errors (HTTP 404)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleResourceNotFoundException(
            ResourceNotFoundException exception, WebRequest webRequest) {

        log.warn("Resource validation miss: {}", exception.getMessage());

        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                exception.getMessage(),
        webRequest.getDescription(false) // Returns the endpoint URI requested
        );

          return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    // 409 Duplicate Resource (username / email already taken)
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorDetails> handleDuplicateResourceException(
            DuplicateResourceException ex, WebRequest request
    ){
        log.warn("Duplicate resource conflict: {}", ex.getMessage());

        ErrorDetails body = new ErrorDetails(
                LocalDateTime.now(),
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                ex.getMessage(),
                request.getDescription(false)
        );
        return new ResponseEntity<>(body, HttpStatus.CONFLICT);
    }

    // Catch DTO Payload Validation Errors (HTTP 400)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDetails> handleValidException(
            MethodArgumentNotValidException ex, WebRequest webRequest) {
        Map<String, String> fieldErrors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            fieldErrors.put(fieldName, errorMessage);

            log.warn("Payload validation failed — field [{}]: {}", fieldName, errorMessage);
        });

        ErrorDetails body = new ErrorDetails(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Request payload validation failed.",
                webRequest.getDescription(false),
                fieldErrors
        );
        return new  ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }


    // Global Catch-All: Catches any unexpected code crashes (e.g., NullPointer, Database down)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleException(
            Exception exception, WebRequest webRequest) {

        log.error("Unhandled exception: ", exception);

        ErrorDetails body = new ErrorDetails(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                "An unexpected internal error occurred .",
                webRequest.getDescription(false)
        );

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
