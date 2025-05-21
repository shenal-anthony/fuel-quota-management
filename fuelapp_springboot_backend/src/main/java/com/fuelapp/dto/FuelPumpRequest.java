package com.fuelapp.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FuelPumpRequest {
    private String licensePlate;
    private BigDecimal pumpedLiters;
    private Integer stationId;
}
