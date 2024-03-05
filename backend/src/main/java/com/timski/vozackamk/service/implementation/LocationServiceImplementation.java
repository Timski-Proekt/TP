package com.timski.vozackamk.service.implementation;

import com.timski.vozackamk.model.AppointmentType;
import com.timski.vozackamk.model.Location;
import com.timski.vozackamk.model.LocationId;
import com.timski.vozackamk.model.dto.LocationDto;
import com.timski.vozackamk.model.exceptions.AppUserNotFoundException;
import com.timski.vozackamk.repository.LocationRepository;
import com.timski.vozackamk.service.LocationService;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class LocationServiceImplementation implements LocationService {
    private final LocationRepository locationRepository;

    public LocationServiceImplementation(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }



    @Override
    public List<Location> findAll() {
        return locationRepository.findAll();
    }

    @Override
    public Location findById(LocationId locationId) {
        try {
            return locationRepository.findById(locationId).orElseThrow(()->new AppUserNotFoundException());
        } catch (AppUserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void save(LocationDto locationDto) {
        Location location = new Location(
                locationDto.getName(),
                locationDto.getAppointmentType()
        );
        locationRepository.save(location);
    }

    @Override
    public void update(LocationId locationId, LocationDto locationDto) {
        Location location = findById(locationId);
        location.setName(locationDto.getName());
        location.setAppointmentType(locationDto.getAppointmentType());
        locationRepository.delete(location);
        locationRepository.save(location);
    }

    @Override
    public void delete(LocationId locationId) {
        Location location = findById(locationId);
        locationRepository.delete(location);
    }
}
