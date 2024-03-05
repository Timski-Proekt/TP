package com.timski.vozackamk.service;

import com.timski.vozackamk.model.Location;
import com.timski.vozackamk.model.LocationId;
import com.timski.vozackamk.model.dto.LocationDto;

import java.util.List;

public interface LocationService {

    List<Location> findAll();
    Location findById(LocationId locationId);
    void save(LocationDto locationDto);

    void update(LocationId locationId, LocationDto locationDto);
    void delete(LocationId locationId);

}
