package com.fuelapp.repository;

import com.fuelapp.model.FuelLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuelLogRepository extends JpaRepository<FuelLog, Integer> {
}
