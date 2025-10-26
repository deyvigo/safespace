package com.example.safespace_back.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class LoginUserDTO {
    @NotBlank(message = "username is required")
    private String username;

    @NotBlank(message = "password is required")
    @Size(min = 6, max = 18, message = "password must be between 6 and 18 characters long")
    private String password;
}
