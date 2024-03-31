package com.timski.vozackamk.web.controller;

import com.timski.vozackamk.model.Location;
import com.timski.vozackamk.model.LocationId;
import com.timski.vozackamk.model.dto.LocationDto;
import com.timski.vozackamk.service.LocationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {
    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public List<Location> getAllLocations() {
        return locationService.findAll();
    }
    @PostMapping
    public void addLocation(@RequestBody LocationDto locationDto) {
        locationService.save(locationDto);
    }

    @GetMapping("/{locationId}")
    public Location updateLocation(@PathVariable LocationId locationId) {
        return locationService.findById(locationId);
    }
    @PostMapping("/{locationId}")
    public void updateLocation(@PathVariable LocationId locationId, @RequestBody LocationDto locationDto) {
        locationService.update(locationId, locationDto);
    }

    @DeleteMapping("/{locationId}")
    public void deleteLocation(@PathVariable LocationId locationId) {
        locationService.delete(locationId);
    }


}
