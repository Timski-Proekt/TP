package com.timski.vozackamk.service.implementation;

import com.timski.vozackamk.model.*;
import com.timski.vozackamk.model.dto.AppointmentDto;
import com.timski.vozackamk.model.dto.PickAppointmentDto;
import com.timski.vozackamk.model.exceptions.AppUserNotFoundException;
import com.timski.vozackamk.model.exceptions.AppointmentNotFoundException;
import com.timski.vozackamk.model.exceptions.LocationNotFoundException;
import com.timski.vozackamk.repository.AppUserRepository;
import com.timski.vozackamk.repository.AppointmentRepository;
import com.timski.vozackamk.repository.LocationRepository;
import com.timski.vozackamk.repository.TransactionRepository;
import com.timski.vozackamk.service.AppUserService;
import com.timski.vozackamk.service.AppointmentService;
import com.timski.vozackamk.service.LocationService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImplementation implements AppointmentService {

    private final LocationService locationService;
    private final AppUserService appUserService;
    private final AppointmentRepository appointmentRepository;
    private final TransactionRepository transactionRepository;
    private final AppUserRepository appUserRepository;

    public AppointmentServiceImplementation(LocationService locationService, AppUserService appUserService, AppointmentRepository appointmentRepository, TransactionRepository transactionRepository, AppUserRepository appUserRepository) {
        this.locationService = locationService;
        this.appUserService = appUserService;
        this.appointmentRepository = appointmentRepository;
        this.transactionRepository = transactionRepository;
        this.appUserRepository = appUserRepository;
    }


    @Override
    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    @Override
    public Appointment findById(UUID uuid) {
        try {
            return appointmentRepository.findById(uuid).orElseThrow(()->new AppointmentNotFoundException(uuid));
        } catch (AppointmentNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void save(AppointmentDto appointmentDto) {
        Location location = locationService.findById(appointmentDto.getLocationId());
        Appointment appointment = new Appointment(
                appointmentDto.getDateTime(),
                location
        );
        appointmentRepository.save(appointment);
    }

    @Override
    public void delete(UUID uuid) {
        Appointment appointment = findById(uuid);
        appointmentRepository.delete(appointment);
    }

    @Override
    public void update(UUID uuid, AppointmentDto appointmentDto) {
        delete(uuid);
        save(appointmentDto);
    }

    @Override
    public List<Appointment> findAllOnDate(LocalDate localDate) {
        List<Appointment> appointments = findAll().stream()
                .filter(appointment -> appointment.getDateTime().equals(localDate))
                .collect(Collectors.toList());
        return appointments;
    }

    @Override
    public List<Appointment> findAllAfterDateTime(LocalDateTime localDateTime) {
        List<Appointment> appointments = findAll().stream()
                .filter(appointment -> appointment.getDateTime().isAfter(localDateTime))
                .collect(Collectors.toList());
        return appointments;
    }

    @Override
    public List<Appointment> findAllBeforeDateTime(LocalDateTime localDateTime) {
        List<Appointment> appointments = findAll().stream()
                .filter(appointment -> appointment.getDateTime().isBefore(localDateTime))
                .collect(Collectors.toList());
        return appointments;
    }

    @Override
    public List<Appointment> findAllAtLocation(LocationId locationId) {
        Location location = locationService.findById(locationId);
        List<Appointment> appointments = findAll().stream()
                .filter(appointment -> appointment.getLocation().equals(location))
                .collect(Collectors.toList());
        return appointments;
    }

    @Override
    public Appointment pickAppointment(PickAppointmentDto pickAppointmentDto) {
        String embg = pickAppointmentDto.getAppUserEmbg();
        UUID uuid = pickAppointmentDto.getAppointmentUuid();
        String cardName = pickAppointmentDto.getCardName();
        int sum = pickAppointmentDto.getSum();

        // Retrieve the AppUser
        AppUser appUser = appUserService.findById(embg);

        // Retrieve the Appointment
        Appointment appointment = findById(uuid);

        // Create and set the Transaction
        Transaction transaction = new Transaction(
                cardName,
                sum,
                appointment
        );
        appointment.setTransaction(transaction);



        // Set user and booking status
        appointment.setUser(appUser);
        appointment.setIsBooked(true);

        // Save the Transaction first
        transactionRepository.save(transaction);


//        List<Appointment> appointments = appUser.getAppointments();
//        appointments.add(appointment);
//        appUser.setAppointments(appointments);
//        appUserRepository.delete(appUser);
//        appUserRepository.save(appUser);

        // Save the Appointment
        appointmentRepository.save(appointment);

        return appointment;
    }

}
