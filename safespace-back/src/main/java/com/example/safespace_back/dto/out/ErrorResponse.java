package com.example.safespace_back.dto.out;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponse {
    private final int statusCode;
    private final String code;
    private final String message;
    private final Map<String, ?> details;

    public static ErrorResponse of(
        HttpStatus status,
        String code,
        String message
    ) {
        return ErrorResponse.builder()
            .statusCode(status.value()).code(code).message(message).build();
    }

    public static ErrorResponse of(
        HttpStatus status,
        String code,
        String message,
        Map<String, ?> details
    ) {
        return ErrorResponse.builder()
            .statusCode(status.value()).code(code).message(message).details(details).build();
    }
}
