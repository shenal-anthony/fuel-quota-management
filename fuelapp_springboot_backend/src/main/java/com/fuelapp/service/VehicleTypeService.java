package com.fuelapp.service;

import com.fuelapp.model.VehicleType;
import com.fuelapp.repository.VehicleTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class VehicleTypeService {

    @Autowired
    private VehicleTypeRepository vehicleTypeRepo;

    public List<VehicleType> getAllVehicleTypes() {
        return vehicleTypeRepo.findAll();
    }

    public VehicleType updateQuota(Integer typeId, BigDecimal defaultQuota) {
        VehicleType type = vehicleTypeRepo.findById(typeId)
                .orElseThrow(() -> new RuntimeException("Vehicle type not found"));
        type.setDefaultQuota(defaultQuota);
        return vehicleTypeRepo.save(type);
    }
}