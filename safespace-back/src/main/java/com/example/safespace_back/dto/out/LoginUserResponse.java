package com.example.safespace_back.dto.out;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class LoginUserResponse {
    private Long id;
    private String username;
    private String name;
    private String lastName;
    private LocalDate birthDay;
}
