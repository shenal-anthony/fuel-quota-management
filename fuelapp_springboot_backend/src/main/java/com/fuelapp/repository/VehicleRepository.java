package com.fuelapp.repository;

import com.fuelapp.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
    Optional<Vehicle> findByLicensePlate(String licensePlate);
    List<Vehicle> findByOwnerId(Integer ownerId);

}
