package com.fuelapp.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VehicleResponseDto {
    private Integer id;
    private String licensePlate;
    private String fuelType;
    private String qrCodeUrl;
    private String type;
}
