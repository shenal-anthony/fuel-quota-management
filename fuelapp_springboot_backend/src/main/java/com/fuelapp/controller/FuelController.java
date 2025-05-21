package com.fuelapp.controller;

import com.fuelapp.dto.FuelPumpRequest;
import com.fuelapp.dto.VehicleFuelInfoDTO;
import com.fuelapp.model.*;
import com.fuelapp.repository.*;
import com.fuelapp.service.SmsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/fuel")
public class FuelController {

    @Autowired private VehicleRepository vehicleRepo;
    @Autowired private FuelQuotaRepository quotaRepo;
    @Autowired private FuelStationRepository stationRepo;
    @Autowired private FuelLogRepository logRepo;
    @Autowired private SmsService smsService;

    @GetMapping("/{licensePlate}")
    public ResponseEntity<VehicleFuelInfoDTO> getVehicleFuelInfo(@PathVariable String licensePlate) {
        Vehicle vehicle = vehicleRepo.findByLicensePlate(licensePlate)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        FuelQuota quota = quotaRepo.findByVehicle(vehicle)
                .orElseThrow(() -> new RuntimeException("Fuel quota not found"));

        VehicleFuelInfoDTO dto = new VehicleFuelInfoDTO(
                vehicle.getLicensePlate(),
                vehicle.getVehicleType().getTypeName(),
                vehicle.getFuelType(),
                quota.getQuotaLimit(),
                quota.getBalance(),
                quota.getLastReset()
        );

        return ResponseEntity.ok(dto);
    }

    @PostMapping("/pump")
    public ResponseEntity<?> pumpFuel(@RequestBody FuelPumpRequest request) {
        Vehicle vehicle = vehicleRepo.findByLicensePlate(request.getLicensePlate())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        FuelQuota quota = quotaRepo.findByVehicle(vehicle)
                .orElseThrow(() -> new RuntimeException("Fuel quota not found"));

        if (quota.getBalance().compareTo(request.getPumpedLiters()) < 0) {
            return ResponseEntity.badRequest().body("Insufficient balance.");
        }

        quota.setBalance(quota.getBalance().subtract(request.getPumpedLiters()));
        quotaRepo.save(quota);

        FuelStation station = stationRepo.findById(request.getStationId())
                .orElseThrow(() -> new RuntimeException("Station not found"));

        FuelLog log = new FuelLog();
        log.setVehicle(vehicle);
        log.setStation(station);
        log.setPumpedLiters(request.getPumpedLiters());
        log.setTimestamp(LocalDateTime.now());
        logRepo.save(log);

        String phone = vehicle.getOwner().getPhoneNumber();
        String sms = String.format(
                "Fuel Pumped: %.2fL\nVehicle: %s\nRemaining Quota: %.2fL",
                request.getPumpedLiters(),
                vehicle.getLicensePlate(),
                quota.getBalance()
        );
        smsService.sendSMS(phone, sms);

        return ResponseEntity.ok("Fuel logged and SMS sent.");
    }
}
