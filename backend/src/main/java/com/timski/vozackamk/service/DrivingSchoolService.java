package com.timski.vozackamk.service;

import com.timski.vozackamk.model.AppUser;
import com.timski.vozackamk.model.DrivingSchool;
import com.timski.vozackamk.model.dto.DrivingSchoolDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
public interface DrivingSchoolService {
    List<DrivingSchool> findAll();
    DrivingSchool findById(UUID uuid);

    void delete(UUID uuid);
    void save(DrivingSchoolDto drivingSchoolDto);
    void update(UUID uuid, DrivingSchoolDto drivingSchoolDto);

    List<AppUser> findAllAppUsersByDrivingSchool(UUID uuid);
}
