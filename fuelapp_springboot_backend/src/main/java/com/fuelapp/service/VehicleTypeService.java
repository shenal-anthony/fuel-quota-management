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

    public VehicleType createVehicleType(String typeName, BigDecimal defaultQuota) {
        if (typeName == null || typeName.trim().isEmpty()) {
            throw new IllegalArgumentException("Vehicle type name is required");
        }
        if (defaultQuota == null || defaultQuota.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Default quota must be positive");
        }
        VehicleType type = new VehicleType();
        type.setTypeName(typeName.trim());
        type.setDefaultQuota(defaultQuota);
        return vehicleTypeRepo.save(type);
    }
}