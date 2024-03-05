package com.timski.vozackamk.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PickAppointmentDto {
    String appUserEmbg;
    UUID appointmentUuid;

    String cardName;
    int sum;

}
