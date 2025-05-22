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
    private String addressNo;
    private String streetName;
    private String city;
    private String district;
    private String province;
    private String contactNumber;
    private String email;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private Boolean isApproved = false;
    private String stationUsername;
    private String stationPassword;

}
