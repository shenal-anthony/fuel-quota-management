package com.fuelapp.service;

import com.fuelapp.model.FuelQuota;
import com.fuelapp.repository.FuelQuotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Service
public class FuelQuotaResetService {

    @Autowired
    private FuelQuotaRepository fuelQuotaRepository;

    // Runs every Monday at 00:00 AM
    @Scheduled(cron = "0 0 0 * * MON")
    public void resetFuelQuotaIfNeeded() {
        LocalDate today = LocalDate.now();

        List<FuelQuota> quotas = fuelQuotaRepository.findAll();

        for (FuelQuota quota : quotas) {
            quota.setLastReset(today);
            // Optionally reset balance to quotaLimit
            quota.setBalance(quota.getQuotaLimit());
        }

        fuelQuotaRepository.saveAll(quotas);
    }

    public void manualResetFuelQuota() {
        LocalDate today = LocalDate.now();

        List<FuelQuota> quotas = fuelQuotaRepository.findAll();

        for (FuelQuota quota : quotas) {
            quota.setLastReset(today);
            quota.setBalance(quota.getQuotaLimit());
        }

        fuelQuotaRepository.saveAll(quotas);
    }
}
