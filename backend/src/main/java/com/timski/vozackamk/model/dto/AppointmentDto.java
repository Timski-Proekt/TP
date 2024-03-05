package com.timski.vozackamk.model.dto;

import com.timski.vozackamk.model.AppUser;
import com.timski.vozackamk.model.Location;
import com.timski.vozackamk.model.LocationId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDto {
    UUID uuid;
    LocationId locationId;
    LocalDateTime dateTime;
    String appUserEmbg;
    Integer negativePoints;
}
