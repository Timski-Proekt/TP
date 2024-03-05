package com.timski.vozackamk.model;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
public class LocationId implements Serializable {
    private String name;
    @Enumerated(EnumType.STRING)
    private AppointmentType appointmentType;

    @Override
    public String toString() {
        return String.format("Location: %s Type: %s", name, appointmentType);
    }
}
