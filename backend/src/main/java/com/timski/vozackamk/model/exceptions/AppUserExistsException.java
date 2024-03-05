package com.timski.vozackamk.model.exceptions;

public class AppUserExistsException extends Exception{

    public AppUserExistsException() {
    }

    public AppUserExistsException(String embg) {
        super(String.format("User with embg: %s already exists.", embg));
    }
}
