package com.fuelapp.controller;

import com.fuelapp.dto.FuelStationRequestDTO;
import com.fuelapp.model.FuelStation;
import com.fuelapp.service.FuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<FuelStation> approveStation(
            @PathVariable Integer stationId,
            @RequestParam String username,
            @RequestParam String password
    ) {
        FuelStation approved = stationService.approveStation(stationId, username, password);
        return ResponseEntity.ok(approved);
    }
}
