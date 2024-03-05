package com.timski.vozackamk.service.implementation;

import com.timski.vozackamk.model.AppUser;
import com.timski.vozackamk.model.Appointment;
import com.timski.vozackamk.model.dto.AppUserDto;
import com.timski.vozackamk.model.dto.LoginAppUserDto;
import com.timski.vozackamk.model.dto.RegistrationAppUserDto;
import com.timski.vozackamk.model.exceptions.AppUserExistsException;
import com.timski.vozackamk.model.exceptions.AppUserNotFoundException;
import com.timski.vozackamk.repository.AppUserRepository;
import com.timski.vozackamk.service.AppUserService;
import com.timski.vozackamk.service.AppointmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AppUserServiceImplementation implements AppUserService {
    private final AppUserRepository appUserRepository;

    public AppUserServiceImplementation(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }


    @Override
    public List<AppUser> findAll() {
        return appUserRepository.findAll();
    }

    @Override
    public AppUser findById(String embg) {
        try {
            return appUserRepository.findById(embg).orElseThrow(()-> new AppUserNotFoundException(embg));
        } catch (AppUserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void register(RegistrationAppUserDto appUserDto) throws AppUserExistsException {
        if(appUserRepository.findById(appUserDto.getEmbg()).isPresent()){
            throw new AppUserExistsException(appUserDto.getEmbg());
        }
        AppUser appUser = new AppUser(
                appUserDto.getEmbg(),
                appUserDto.getName(),
                appUserDto.getLastName(),
                appUserDto.getEmail(),
                appUserDto.getPassword(),
                appUserDto.getBirthDate(),
                appUserDto.getPhone(),
                appUserDto.getDrivingSchool()
        );
        appUserRepository.save(appUser);
    }

    @Override
    public void login(LoginAppUserDto appUserDto) {
        // TODO Login to the system.
    }

    @Override
    public void update(String embg, AppUserDto appUserDto) {
        AppUser appUser = findById(embg);
        appUser.setName(appUserDto.getName());
        appUser.setLastName(appUserDto.getLastName());
        appUser.setBirthDate(appUserDto.getBirthDate());
        appUserRepository.delete(appUser);
        appUserRepository.save(appUser);
    }

    @Override
    public void delete(String embg) {
        AppUser appUser = findById(embg);
        appUserRepository.delete(appUser);
    }

    public void addAppointment(String embg, Appointment appointment) {
        AppUser appUser = findById(embg);
//        List<Appointment> appointments = appUser.getAppointments();
//        appointments.add(appointment);
//        appUser.setAppointments(appointments);

        appUserRepository.delete(appUser);
        appUserRepository.save(appUser);
    }

}
