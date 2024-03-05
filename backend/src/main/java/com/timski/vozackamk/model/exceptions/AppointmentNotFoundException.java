package com.timski.vozackamk.model.exceptions;

import java.util.UUID;

public class AppointmentNotFoundException extends Exception{
    public AppointmentNotFoundException(UUID uuid) {
        super(String.format("Appointment with the id: %d not found.", uuid));
    }
}
