package com.timski.vozackamk.web.controller;

import com.timski.vozackamk.model.DrivingSchool;
import com.timski.vozackamk.service.DrivingSchoolService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/drivingschools")
public class DrivingSchoolController {
    private final DrivingSchoolService drivingSchoolService;

    public DrivingSchoolController(DrivingSchoolService drivingSchoolService) {
        this.drivingSchoolService = drivingSchoolService;
    }

    @GetMapping
    public List<DrivingSchool> getAllDrivingSchools() {
        return drivingSchoolService.findAll();
    }


}
