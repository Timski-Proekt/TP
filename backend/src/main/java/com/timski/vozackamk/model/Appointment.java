package com.timski.vozackamk.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Data
@NoArgsConstructor
public class Appointment {
    // Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID uuid;
    Integer negativePoints;
    Boolean isBooked;
    LocalDateTime dateTime;

    // Relations
    @ManyToOne
    Location location;

    @ManyToOne(cascade = CascadeType.ALL)
    AppUser user;

    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Transaction transaction;

    public Appointment(LocalDateTime dateTime, Location location) {
        this.dateTime = dateTime;
        this.location = location;

        this.user = null;
        this.isBooked = false;
        this.negativePoints = null;
    }
}
