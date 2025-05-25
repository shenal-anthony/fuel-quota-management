package com.fuelapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fuelapp.model.VehicleType;

public interface VehicleTypeRepository extends JpaRepository<VehicleType, Integer> {
    Optional<VehicleType> findByTypeName(String licensePlate);
}
