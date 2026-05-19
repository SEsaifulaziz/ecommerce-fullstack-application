package com.developerhubcorporation.e_commerce.backend.design.exceptoin.dto;

public class ResourceNotFoundException extends RuntimeException {
  public ResourceNotFoundException(String message) {
    super(message);
  }
}
