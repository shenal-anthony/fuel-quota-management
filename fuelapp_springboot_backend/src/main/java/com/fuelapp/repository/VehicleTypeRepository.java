package com.fuelapp.repository;

import com.fuelapp.model.Vehicle;
import com.fuelapp.model.VehicleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VehicleTypeRepository extends JpaRepository<VehicleType, Integer> {
    Optional<VehicleType> findByTypeName(String licensePlate);
}
