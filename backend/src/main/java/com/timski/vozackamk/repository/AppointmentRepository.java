package com.timski.vozackamk.repository;

import com.timski.vozackamk.model.AppUser;
import com.timski.vozackamk.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

    List<Appointment> findAllByUser(AppUser appUser);
}
