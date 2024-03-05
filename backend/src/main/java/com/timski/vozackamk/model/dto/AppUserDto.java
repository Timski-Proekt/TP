package com.timski.vozackamk.model.dto;

import com.timski.vozackamk.model.Appointment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppUserDto {
    String embg;
    String name;
    String lastName;
    LocalDate birthDate;
    List<Appointment> appointments;
}
