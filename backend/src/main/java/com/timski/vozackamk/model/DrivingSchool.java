package com.timski.vozackamk.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class DrivingSchool {
    // Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID uuid;

    String name;
    String email;

    // Relations
    @JsonIgnore
    @OneToMany(mappedBy = "drivingSchool")
    List<AppUser> appUsers;

    public DrivingSchool(String name, String email) {
        this.name = name;
        this.email = email;
        this.appUsers = new ArrayList<>();
    }
}
