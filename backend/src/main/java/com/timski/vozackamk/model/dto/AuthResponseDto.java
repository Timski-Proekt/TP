package com.timski.vozackamk.model.dto;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String accessToken;
    private String tokenType = "Bearer ";
    private String embg;

    public AuthResponseDto(String accessToken, String embg) {
        this.accessToken = accessToken;
        this.embg = embg;
    }
}
