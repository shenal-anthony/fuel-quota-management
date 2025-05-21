package com.fuelapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "fuel_quotas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FuelQuota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "vehicle_id", unique = true)
    private Vehicle vehicle;

    @Column(precision = 5, scale = 2)
    private BigDecimal quotaLimit;

    @Column(precision = 5, scale = 2)
    private BigDecimal balance;

    private LocalDate lastReset;
}
