package com.example.safespace_back.dto.out;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponse {
    private final int status;
    private final String code;
    private final String message;
    private final String details;

    public static ErrorResponse of(
        HttpStatus status,
        String code,
        String message
    ) {
        return ErrorResponse.builder()
            .status(status.value()).code(code).message(message).build();
    }

    public static ErrorResponse of(
        HttpStatus status,
        String code,
        String message,
        String details
    ) {
        return ErrorResponse.builder()
            .status(status.value()).code(code).message(message).details(details).build();
    }
}
