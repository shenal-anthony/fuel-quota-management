package com.fuelapp.repository;

import com.fuelapp.model.FuelQuota;
import com.fuelapp.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FuelQuotaRepository extends JpaRepository<FuelQuota, Integer> {
    Optional<FuelQuota> findByVehicle(Vehicle vehicle);
}
