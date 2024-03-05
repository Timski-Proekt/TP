package com.timski.vozackamk.model.dto;

import com.timski.vozackamk.model.DrivingSchool;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationAppUserDto {

    String embg;
    String name;
    String lastName;
    String email;
    String password;

    LocalDate birthDate;


    String phone;
    DrivingSchool drivingSchool;
}
