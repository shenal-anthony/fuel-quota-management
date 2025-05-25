package com.fuelapp.controller;

import com.fuelapp.service.FuelQuotaResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fuel-quota")
public class FuelQuotaController {

    @Autowired
    private FuelQuotaResetService resetService;

    @PostMapping("/reset")
    public String resetFuelQuotaManually() {
        resetService.manualResetFuelQuota();
        return "Fuel quotas successfully reset!";
    }
}
