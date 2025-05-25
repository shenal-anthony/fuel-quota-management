package com.fuelapp.controller;

import com.fuelapp.dto.FuelStationRequestDTO;
import com.fuelapp.model.FuelStation;
import com.fuelapp.service.FuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/station")
public class FuelStationController {

    @Autowired
    private FuelStationService stationService;

    @PostMapping("/register")
    public ResponseEntity<FuelStation> registerStation(@RequestBody FuelStationRequestDTO dto) {
        FuelStation created = stationService.createFuelStation(dto);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/approve/{stationId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FuelStation> approveStation(@PathVariable Integer stationId) {
        FuelStation approved = stationService.approveStation(stationId);
        return ResponseEntity.ok(approved);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FuelStation>> getAllStations() {
        List<FuelStation> stations = stationService.getAllStations();
        return ResponseEntity.ok(stations);
    }
}