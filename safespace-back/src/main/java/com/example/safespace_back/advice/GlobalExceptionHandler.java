package com.example.safespace_back.advice;

import com.example.safespace_back.dto.out.ErrorResponse;
import com.example.safespace_back.exception.ResourceNotFoundException;
import com.example.safespace_back.exception.StudentInvalidadIdFacultyException;
import com.example.safespace_back.exception.UnauthorizedAccessException;
import com.example.safespace_back.exception.UserInvalidCredentialsException;
import com.example.safespace_back.exception.UsernameAlreadyUsedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = ex.getBindingResult().getFieldErrors().stream()
            .collect(Collectors.toMap(
                fe -> toSnakeCase(fe.getField()),
                fe -> Objects.requireNonNullElse(fe.getDefaultMessage(), "Blank error message"),
                (a, b) -> a)
            );
        return ResponseEntity.badRequest()
            .body(ErrorResponse.of(HttpStatus.BAD_REQUEST, "VALIDATION_ERROR", "Validation failed", errors));
    }

    @ExceptionHandler(UsernameAlreadyUsedException.class)
    public ResponseEntity<ErrorResponse> handleUsernameTaken(UsernameAlreadyUsedException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(ErrorResponse.of(HttpStatus.CONFLICT, "USERNAME_TAKEN", ex.getMessage()));
    }

    @ExceptionHandler(UserInvalidCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleUserInvalidCredentials(UserInvalidCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse.of(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS", ex.getMessage()));
    }

    @ExceptionHandler(StudentInvalidadIdFacultyException.class)
    public ResponseEntity<ErrorResponse> handleStudentInvalidadIdFaculty(StudentInvalidadIdFacultyException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse.of(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS", ex.getMessage()));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(ErrorResponse.of(HttpStatus.NOT_FOUND, "RESOURCE_NOT_FOUND", ex.getMessage()));
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedAccessException(UnauthorizedAccessException ex) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN)
        .body(ErrorResponse.of(HttpStatus.FORBIDDEN, "UNAUTHORIZED_ACCESS", ex.getMessage()));
    }

    private static String toSnakeCase(String field) {
        return field.replaceAll("([a-z])([A-Z]+)", "$1_$2").toLowerCase();
    }
}
