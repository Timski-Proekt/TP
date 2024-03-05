package com.timski.vozackamk.model.exceptions;

import com.timski.vozackamk.model.LocationId;

import java.util.UUID;

public class LocationNotFoundException extends Exception{
    public LocationNotFoundException(LocationId locationId) {
        super(String.format("%s not found.", locationId.toString()));
    }
}
