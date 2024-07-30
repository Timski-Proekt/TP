package com.timski.vozackamk.service.implementation;

import com.timski.vozackamk.model.AppUser;
import com.timski.vozackamk.model.Appointment;
import com.timski.vozackamk.model.DrivingSchool;
import com.timski.vozackamk.model.dto.AppUserDto;
import com.timski.vozackamk.model.dto.LoginAppUserDto;
import com.timski.vozackamk.model.dto.RegistrationAppUserDto;
import com.timski.vozackamk.model.exceptions.*;
import com.timski.vozackamk.repository.AppUserRepository;
import com.timski.vozackamk.repository.DrivingSchoolRepository;
import com.timski.vozackamk.service.AppUserService;
import com.timski.vozackamk.service.AppointmentService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class AppUserServiceImplementation implements AppUserService {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final DrivingSchoolRepository drivingSchoolRepository;

    public AppUserServiceImplementation(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder, DrivingSchoolRepository drivingSchoolRepository) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.drivingSchoolRepository = drivingSchoolRepository;
    }


    @Override
    public List<AppUser> findAll() {
        return appUserRepository.findAll();
    }

    @Override
    public AppUser findById(String embg) {
        try {
            return appUserRepository.findById(embg).orElseThrow(() -> new AppUserNotFoundException(embg));
        } catch (AppUserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public AppUser findByEmail(String email) {
        try {
            return appUserRepository.findByEmail(email).orElseThrow(() -> new AppUserNotFoundException(email));
        } catch (AppUserNotFoundException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public void register(RegistrationAppUserDto appUserDto) throws AppUserExistsException, DrivingSchoolNotFoundException {
        if (appUserRepository.findById(appUserDto.getEmbg()).isPresent()) {
            throw new AppUserExistsException(appUserDto.getEmbg());
        }
        DrivingSchool drivingSchool = this.drivingSchoolRepository.findById(appUserDto.getDrivingSchoolId())
                .orElseThrow(() -> new DrivingSchoolNotFoundException(appUserDto.getDrivingSchoolId()));


        AppUser user = new AppUser();
        user.setName(appUserDto.getName());
        user.setLastName(appUserDto.getLastName());
        user.setEmail(appUserDto.getEmail());
        user.setPassword(passwordEncoder.encode(appUserDto.getPassword()));
        user.setEmbg(appUserDto.getEmbg());
        user.setPhone(appUserDto.getPhone());
        user.setBirthDate(appUserDto.getBirthDate());
        user.setRole(appUserDto.getRole());
        user.setDrivingSchool(drivingSchool);
        user.setRegistrationDate(LocalDate.now());

        appUserRepository.save(user);
    }

    @Override
    public void login(LoginAppUserDto appUserDto) {
        if (appUserDto.getEmail() == null || appUserDto.getEmail().isEmpty() || appUserDto.getPassword() == null || appUserDto.getPassword().isEmpty()) {
            throw new InvalidArgumentsException();
        }
        AppUser appUser = appUserRepository.findByEmailAndPassword(appUserDto.getEmail(), appUserDto.getPassword());
        if (appUser == null) throw new InvalidUserCredentialsException();
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
