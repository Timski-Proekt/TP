package com.timski.vozackamk.model.exceptions;

import java.util.UUID;

public class DrivingSchoolNotFoundException extends Exception{
    public DrivingSchoolNotFoundException(UUID uuid) {
        super(String.format("DrivingSchool with the id: %d not found.", uuid));
    }
}
