package com.timski.vozackamk.model.dto;

import com.timski.vozackamk.model.AppointmentType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationDto {
    String name;
    AppointmentType appointmentType;
}
