package com.fuelapp.controller;

import com.fuelapp.dto.VehicleRegisterDto;
import com.fuelapp.dto.VehicleResponseDto;
import com.fuelapp.model.Vehicle;
import com.fuelapp.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    @PostMapping("/own-vehicles")
    public ResponseEntity<List<VehicleResponseDto>> getVehiclesByUser(@RequestBody Map<String, Integer> payload) {
        Integer userId = payload.get("userId");
        List<VehicleResponseDto> vehicles = vehicleService.getVehiclesByOwner(userId);
        return ResponseEntity.ok(vehicles);
    }

}
