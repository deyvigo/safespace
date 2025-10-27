package com.example.safespace_back.exception;

public class UserInvalidCredentialsException extends RuntimeException {
    public UserInvalidCredentialsException(String message) {
        super(message);
    }
}
