package com.fuelapp.controller;

import com.fuelapp.dto.FuelStationRequestDTO;
import com.fuelapp.model.FuelStation;
import com.fuelapp.model.VehicleType;
import com.fuelapp.service.FuelStationService;
import com.fuelapp.service.VehicleTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    @PostMapping("/own-stations")
    public ResponseEntity<Optional<FuelStation>> getStationByUserId(@RequestBody Map<String, Object> payload) {
        Integer userId = (Integer) payload.get("userId");
        Optional<FuelStation> station = stationService.getFuelStationByUserId(userId);
        if (station != null) {
            return ResponseEntity.ok(station);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @Autowired
    private VehicleTypeService vehicleTypeService;

    @GetMapping("/vehicle-types/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<VehicleType>> getAllVehicleTypes() {
        List<VehicleType> types = vehicleTypeService.getAllVehicleTypes();
        return ResponseEntity.ok(types);
    }

    @PostMapping("/vehicle-types/update-quota/{typeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VehicleType> updateQuota(
            @PathVariable Integer typeId,
            @RequestBody QuotaRequest request) {
        VehicleType updated = vehicleTypeService.updateQuota(typeId, request.getDefaultQuota());
        return ResponseEntity.ok(updated);
    }

    // NEW CODE STARTS HERE
    @PostMapping("/vehicle-types/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VehicleType> addVehicleType(@RequestBody VehicleTypeRequest request) {
        VehicleType created = vehicleTypeService.createVehicleType(
            request.getTypeName(),
            request.getDefaultQuota()
        );
        return ResponseEntity.ok(created);
    }
}

// EXISTING INNER CLASS
class QuotaRequest {
    private BigDecimal defaultQuota;

    public BigDecimal getDefaultQuota() {
        return defaultQuota;
    }

    public void setDefaultQuota(BigDecimal defaultQuota) {
        this.defaultQuota = defaultQuota;
    }
}

// NEW INNER CLASS
class VehicleTypeRequest {
    private String typeName;
    private BigDecimal defaultQuota;

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public BigDecimal getDefaultQuota() {
        return defaultQuota;
    }

    public void setDefaultQuota(BigDecimal defaultQuota) {
        this.defaultQuota = defaultQuota;
    }
}