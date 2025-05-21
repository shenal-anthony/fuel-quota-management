package com.fuelapp.service;

import com.fuelapp.dmt.model.VehicleRegistry;
import com.fuelapp.dmt.repository.VehicleRegistryRepository;
import com.fuelapp.dto.VehicleRegisterDto;
import com.fuelapp.model.User;
import com.fuelapp.model.Vehicle;
import com.fuelapp.model.VehicleType;
import com.fuelapp.repository.UserRepository;
import com.fuelapp.repository.VehicleRepository;
import com.fuelapp.repository.VehicleTypeRepository;
import com.fuelapp.util.QRCodeGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final VehicleRegistryRepository vehicleRegistryRepository;
    private final UserRepository userRepository;
    private final VehicleTypeRepository vehicleTypeRepository;

    @Transactional
    public Vehicle registerVehicle(VehicleRegisterDto dto) {
        // 1. Validate vehicle exists in DMT DB
        VehicleRegistry dmtVehicle = vehicleRegistryRepository.findByLicensePlate(dto.getLicensePlate())
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found in DMT registry"));

        if (!dmtVehicle.getChassisNumber().equals(dto.getChassisNumber())) {
            throw new IllegalArgumentException("Chassis number does not match DMT records");
        }

        // 2. Check if already registered in main DB
        Optional<Vehicle> existingVehicle = vehicleRepository.findByLicensePlate(dto.getLicensePlate());
        if (existingVehicle.isPresent()) {
            throw new IllegalArgumentException("Vehicle already registered");
        }

        // 3. Get owner (User)
        User owner = userRepository.findById(dto.getOwnerId())
                .orElseThrow(() -> new IllegalArgumentException("Owner user not found"));

        // 4. Get vehicle type entity by name (assuming dto.vehicleType is a String)
        VehicleType vehicleType = vehicleTypeRepository.findByTypeName(dmtVehicle.getVehicleType())
                .orElseThrow(() -> new IllegalArgumentException("Vehicle type not recognized"));

        // 5. Create vehicle entity
        Vehicle vehicle = new Vehicle();
        vehicle.setLicensePlate(dto.getLicensePlate());
        vehicle.setChassisNumber(dto.getChassisNumber());
        vehicle.setOwner(owner);
        vehicle.setFuelType(dmtVehicle.getFuelType());
        vehicle.setVehicleType(vehicleType);

        // 6. Save vehicle to main DB
        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        // 7. Generate QR code and save path/url
        String qrCodeUrl = QRCodeGenerator.generateQRCode(savedVehicle.getLicensePlate());
        savedVehicle.setQrCodeUrl(qrCodeUrl);

        return vehicleRepository.save(savedVehicle);

    }
}
