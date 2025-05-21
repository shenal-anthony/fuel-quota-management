package com.fuelapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VehicleRegisterDto {
    private String licensePlate;
    private String chassisNumber;
    private String vehicleType; // optional if you want to accept from user, else can remove
    private Integer ownerId;
}
