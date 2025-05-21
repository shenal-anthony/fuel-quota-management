package com.fuelapp.dmt.model;

import lombok.*;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "vehicle_registry")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VehicleRegistry {

    @Id
    @Column(name = "license_plate", nullable = false)
    private String licensePlate;

    @Column(name = "owner_nic", nullable = false)
    private String ownerNic;

    @Column(name = "vehicle_type", nullable = false)
    private String vehicleType;

    @Column(name = "fuel_type", nullable = false)
    private String fuelType;

    @Column(name = "chassis_number", nullable = false, unique = true)
    private String chassisNumber;

    @Column(name = "registered_date")
    @Temporal(TemporalType.DATE)
    private Date registeredDate;
}
