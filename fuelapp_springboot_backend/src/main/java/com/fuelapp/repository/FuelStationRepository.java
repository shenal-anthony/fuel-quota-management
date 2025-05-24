package com.fuelapp.repository;

import com.fuelapp.model.FuelStation;
import com.fuelapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FuelStationRepository extends JpaRepository<FuelStation, Integer> {
    Optional<FuelStation> findByUserID(Integer userId);
}
