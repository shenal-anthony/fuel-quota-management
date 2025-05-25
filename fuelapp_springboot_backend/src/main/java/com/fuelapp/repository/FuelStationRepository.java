package com.fuelapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fuelapp.model.FuelStation;

public interface FuelStationRepository extends JpaRepository<FuelStation, Integer> {
    Optional<FuelStation> findByUser_Id(Integer userId);
}