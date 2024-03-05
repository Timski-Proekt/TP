package com.timski.vozackamk.service;

import com.timski.vozackamk.model.AppUser;
import com.timski.vozackamk.model.Appointment;
import com.timski.vozackamk.model.dto.AppUserDto;
import com.timski.vozackamk.model.dto.AppointmentDto;
import com.timski.vozackamk.model.dto.LoginAppUserDto;
import com.timski.vozackamk.model.dto.RegistrationAppUserDto;
import com.timski.vozackamk.model.exceptions.AppUserExistsException;

import java.util.List;
import java.util.UUID;

public interface AppUserService {
    List<AppUser> findAll();
    AppUser findById(String embg);

    void register(RegistrationAppUserDto appUserDto) throws AppUserExistsException;
    void login(LoginAppUserDto appUserDto);

    void update(String embg, AppUserDto appUserDto);
    void delete(String embg);
    public void addAppointment(String embg, Appointment appointment);
}
