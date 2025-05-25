package com.fuelapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fuelapp.model.FuelStation;

public interface FuelStationRepository extends JpaRepository<FuelStation, Integer> {
    Optional<FuelStation> findByUser_Id(Integer userId);

    @Query("SELECT COUNT(DISTINCT fs.user.id) FROM FuelStation fs")
    Long countDistinctOwners();
}