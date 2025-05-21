package com.fuelapp.controller;

import com.fuelapp.dto.VehicleRegisterDto;
import com.fuelapp.model.Vehicle;
import com.fuelapp.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping("/register")
    public ResponseEntity<?> registerVehicle(@RequestBody VehicleRegisterDto dto) {
        try {
            Vehicle vehicle = vehicleService.registerVehicle(dto);
            return new ResponseEntity<>(vehicle, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
