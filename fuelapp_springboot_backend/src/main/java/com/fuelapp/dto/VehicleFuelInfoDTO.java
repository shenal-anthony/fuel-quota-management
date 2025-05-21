package com.fuelapp.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VehicleFuelInfoDTO {
    private String licensePlate;
    private String vehicleType;
    private String fuelType;
    private BigDecimal quotaLimit;
    private BigDecimal balance;
    private LocalDate lastReset;
}
