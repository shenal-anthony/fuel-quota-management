package com.fuelapp.repository;

import com.fuelapp.model.FuelStation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuelStationRepository extends JpaRepository<FuelStation, Integer> {
}
