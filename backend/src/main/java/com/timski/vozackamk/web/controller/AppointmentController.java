package com.timski.vozackamk.web.controller;

import com.timski.vozackamk.model.AppUser;
import com.timski.vozackamk.model.Appointment;
import com.timski.vozackamk.model.Category;
import com.timski.vozackamk.model.dto.AppointmentDto;
import com.timski.vozackamk.model.dto.PickAppointmentDto;
import com.timski.vozackamk.service.AppUserService;
import com.timski.vozackamk.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final AppUserService appUserService;

    public AppointmentController(AppointmentService appointmentService, AppUserService appUserService) {
        this.appointmentService = appointmentService;
        this.appUserService = appUserService;
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.findAll();
    }

    @GetMapping("/byEmbg")
    public List<Appointment> getAllAppointmentsByAppUser(@RequestParam String embg) {
        return appointmentService.findAllAppointmentsByAppUser(embg);
    }
    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return appointmentService.findAllCategories();
    }

    @PostMapping
    public void addAppointment(@RequestBody AppointmentDto appointmentDto) {
        appointmentService.save(appointmentDto);
    }

    @PutMapping("/booked")
    public void bookingAppointment(@RequestParam UUID appointmentId, @RequestParam String embg) {
        appointmentService.book(appointmentId, embg);
    }

    @PostMapping("/pick-appointment")
    public void pickAppointment(@RequestBody PickAppointmentDto pickAppointmentDto) {
        appointmentService.pickAppointment(pickAppointmentDto);
    }

}
