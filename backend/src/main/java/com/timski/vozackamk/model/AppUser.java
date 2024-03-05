package com.timski.vozackamk.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class AppUser {
    // Attributes
    @Id
    String embg;

    String name;
    String lastName;
    String email;
    String password;

    LocalDate registrationDate;
    LocalDate birthDate;

    String phone;

    // Relations
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    List<Appointment> appointments;

    @ManyToOne
    DrivingSchool drivingSchool;

    public AppUser(String embg, String name, String lastName, String email, String password, LocalDate birthDate, String phone, DrivingSchool drivingSchool) {
        this.embg = embg;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        this.phone = phone;
        this.drivingSchool = drivingSchool;

        registrationDate = LocalDate.now();
        appointments = new ArrayList<>();
    }
}
