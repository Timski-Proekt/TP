package com.timski.vozackamk.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
public class Transaction {
    // Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID uuid;

    String cardName;

    int sum;

    // Relations
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    Appointment appointment;


    public Transaction(String cardName, int sum, Appointment appointment) {
        this.cardName = cardName;
        this.sum = sum;
        this.appointment = appointment;
    }


}
