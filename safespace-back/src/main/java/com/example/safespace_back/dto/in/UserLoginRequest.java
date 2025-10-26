package com.example.safespace_back.dto.in;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class UserLoginRequest {
    private String username;
    private String password;
    private String name;
    private String lastName;
    private LocalDate birthDay;
}
