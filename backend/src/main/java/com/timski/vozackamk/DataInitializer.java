package com.timski.vozackamk;

import com.timski.vozackamk.model.*;
import com.timski.vozackamk.repository.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Component
public class DataInitializer {

    private final LocationRepository locationRepository;
    private final AppointmentRepository appointmentRepository;
    private final AppUserRepository appUserRepository;
    private final DrivingSchoolRepository drivingSchoolRepository;
    private final TransactionRepository transactionRepository;

    @Autowired
    public DataInitializer(LocationRepository locationRepository, AppointmentRepository appointmentRepository, AppUserRepository appUserRepository, DrivingSchoolRepository drivingSchoolRepository, TransactionRepository transactionRepository) {
        this.locationRepository = locationRepository;
        this.appointmentRepository = appointmentRepository;
        this.appUserRepository = appUserRepository;
        this.drivingSchoolRepository = drivingSchoolRepository;
        this.transactionRepository = transactionRepository;
    }

    @PostConstruct
    public void initialize() {
        initLocations();
        initDrivingSchools();
        initAppUsers();
        initAppointments();
    }
    public void initLocations() {
        locationRepository.save(new Location("ednoto mesto vo skopje", AppointmentType.POLIGON));
        locationRepository.save(new Location("negde tamu selodrom", AppointmentType.PRAKTICNO));
        locationRepository.save(new Location("nadvor od skopje", AppointmentType.TEORIJA));
        locationRepository.save(new Location("BITOLA", AppointmentType.TEORIJA));
    }
    public void initDrivingSchools() {
        drivingSchoolRepository.save(
                new DrivingSchool(
                        "Safe Driving Academy",
                        "contact@safedrivingacademy.com"
                )
        );
        drivingSchoolRepository.save(
                new DrivingSchool(
                        "Best Driving School",
                        "info@bestdrivingschool.com"
                )
        );

    }
    public void initAppUsers() {
        Random random = new Random();
        List<DrivingSchool> drivingSchools = drivingSchoolRepository.findAll();
        appUserRepository.save(
                new AppUser(
                        "1234567890123",
                        "John",
                        "Doe",
                        "john@example.com",
                        "password123",
                        LocalDate.of(1990, 5, 15),
                        "+1234567890",
                        drivingSchools.get(random.nextInt(drivingSchools.size()))
                )

        );
        appUserRepository.save(
            new AppUser(
                    "9876543210987",
                    "Jane",
                    "Smith",
                    "jane@example.com",
                    "password456",
                    LocalDate.of(1995, 8, 20),
                    "+9876543210",
                    drivingSchools.get(random.nextInt(drivingSchools.size())) // Randomly select a driving school
            )
        );

    }
    public void initAppointments() {
        Random random = new Random();

        List<Location> locations = locationRepository.findAll();
        for (int i = 0; i < 10; i++) {
            LocalDateTime dateTime = LocalDateTime.now().plusDays(random.nextInt(30));
            Location location = locations.get(random.nextInt(locations.size()));
            Appointment appointment = new Appointment(dateTime, location);
            appointmentRepository.save(appointment);
        }
    }

}
