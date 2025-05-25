package com.fuelapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

}
