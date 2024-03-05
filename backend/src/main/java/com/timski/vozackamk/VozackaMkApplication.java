package com.timski.vozackamk;

import com.timski.vozackamk.model.AppointmentType;
import com.timski.vozackamk.model.Location;
import com.timski.vozackamk.model.dto.AppointmentDto;
import com.timski.vozackamk.model.dto.LocationDto;
import com.timski.vozackamk.repository.LocationRepository;
import com.timski.vozackamk.service.LocationService;
import com.timski.vozackamk.service.implementation.LocationServiceImplementation;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VozackaMkApplication {



    public static void main(String[] args) {

        SpringApplication.run(VozackaMkApplication.class, args);

    }

}
