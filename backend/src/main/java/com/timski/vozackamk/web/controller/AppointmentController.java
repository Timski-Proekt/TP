package com.timski.vozackamk.web.controller;


import com.timski.vozackamk.model.Appointment;
import com.timski.vozackamk.model.dto.AppointmentDto;
import com.timski.vozackamk.model.dto.PickAppointmentDto;
import com.timski.vozackamk.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.findAll();
    }

    @PostMapping
    public void addAppointment(@RequestBody AppointmentDto appointmentDto) {
        appointmentService.save(appointmentDto);
    }

    @PostMapping("/pick-appointment")
    public void pickAppointment(@RequestBody PickAppointmentDto pickAppointmentDto) {
        appointmentService.pickAppointment(pickAppointmentDto);
    }
}
