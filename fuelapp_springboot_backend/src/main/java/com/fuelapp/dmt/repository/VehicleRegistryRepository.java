package com.fuelapp.dmt.repository;

import com.fuelapp.dmt.model.VehicleRegistry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VehicleRegistryRepository extends JpaRepository<VehicleRegistry, String> {
    Optional<VehicleRegistry> findByLicensePlate(String licensePlate);
}
