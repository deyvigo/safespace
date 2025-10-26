package com.example.safespace_back.dto.out;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtDTO {
    private String token;
    private String refreshToken;
}
