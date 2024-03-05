package com.timski.vozackamk.model.exceptions;

public class AppUserNotFoundException extends Exception{

    public AppUserNotFoundException() {
    }

    public AppUserNotFoundException(String embg) {
        super(String.format("User with embg: %s not found.", embg));
    }
}
