package com.fuelapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fuel_stations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FuelStation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String stationName;
    private String location;
    private String contactNumber;
    private String email;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private Boolean isApproved = false;
}
