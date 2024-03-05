package com.timski.vozackamk.service;


import com.timski.vozackamk.model.Appointment;
import com.timski.vozackamk.model.LocationId;
import com.timski.vozackamk.model.dto.AppointmentDto;
import com.timski.vozackamk.model.dto.PickAppointmentDto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface AppointmentService {
    List<Appointment> findAll();
    Appointment findById(UUID uuid);

    // Basic CRUD
    void save(AppointmentDto appointmentDto);
    void delete(UUID uuid);
    void update(UUID uuid, AppointmentDto appointmentDto);

    // AppUser stuff
    // Searching
    List<Appointment> findAllOnDate(LocalDate localDate);
    List<Appointment> findAllAfterDateTime(LocalDateTime localDateTime);
    List<Appointment> findAllBeforeDateTime(LocalDateTime localDateTime);
    List<Appointment> findAllAtLocation(LocationId locationId);


    Appointment pickAppointment(PickAppointmentDto pickAppointmentDto);



}
