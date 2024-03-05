package com.timski.vozackamk.service.implementation;

import com.timski.vozackamk.model.AppUser;
import com.timski.vozackamk.model.DrivingSchool;
import com.timski.vozackamk.model.dto.DrivingSchoolDto;
import com.timski.vozackamk.model.exceptions.DrivingSchoolNotFoundException;
import com.timski.vozackamk.repository.DrivingSchoolRepository;
import com.timski.vozackamk.service.DrivingSchoolService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public class DrivingSchoolServiceImplementation implements DrivingSchoolService {
    private final DrivingSchoolRepository drivingSchoolRepository;

    public DrivingSchoolServiceImplementation(DrivingSchoolRepository drivingSchoolRepository) {
        this.drivingSchoolRepository = drivingSchoolRepository;
    }


    @Override
    public List<DrivingSchool> findAll() {
        return drivingSchoolRepository.findAll();
    }

    @Override
    public DrivingSchool findById(UUID uuid) {
        try {
            DrivingSchool drivingSchool = drivingSchoolRepository.findById(uuid).orElseThrow(()->new DrivingSchoolNotFoundException(uuid));
            return drivingSchool;
        } catch (DrivingSchoolNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void delete(UUID uuid) {
        drivingSchoolRepository.deleteById(uuid);
    }

    @Override
    public void save(DrivingSchoolDto drivingSchoolDto) {
         DrivingSchool drivingSchool = new DrivingSchool(
                 drivingSchoolDto.getName(),
                 drivingSchoolDto.getEmail()
         );
         drivingSchoolRepository.save(drivingSchool);
    }

    @Override
    public void update(UUID uuid, DrivingSchoolDto drivingSchoolDto) {
        DrivingSchool drivingSchool = findById(uuid);
        drivingSchool.setName(drivingSchoolDto.getName());
        drivingSchool.setEmail(drivingSchool.getEmail());

        drivingSchoolRepository.deleteById(uuid);
        drivingSchoolRepository.save(drivingSchool);
    }

    @Override
    public List<AppUser> findAllAppUsersByDrivingSchool(UUID uuid) {
        DrivingSchool drivingSchool = findById(uuid);
        return drivingSchool.getAppUsers();
    }
}
