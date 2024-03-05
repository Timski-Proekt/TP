package com.timski.vozackamk.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(LocationId.class)
public class Location {
    // Attributes
    @Id
    String name;
    @Id
    @Enumerated(EnumType.STRING)
    AppointmentType appointmentType;
}

