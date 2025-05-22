package com.fuelapp.service;

import com.fuelapp.dto.FuelStationRequestDTO;
import com.fuelapp.model.FuelStation;
import com.fuelapp.model.User;
import com.fuelapp.repository.FuelStationRepository;
import com.fuelapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FuelStationService {

    @Autowired
    private FuelStationRepository stationRepo;

    @Autowired
    private UserRepository userRepo;

    public FuelStation createFuelStation(FuelStationRequestDTO dto) {
        User user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        FuelStation station = new FuelStation();
        station.setStationName(dto.getStationName());
        station.setAddressNo(dto.getAddressNo());
        station.setStreetName(dto.getStreetName());
        station.setCity(dto.getCity());
        station.setDistrict(dto.getDistrict());
        station.setProvince(dto.getProvince());
        station.setContactNumber(dto.getContactNumber());
        station.setEmail(dto.getEmail());
        station.setUser(user);
        station.setIsApproved(false);

        return stationRepo.save(station);
    }

    public FuelStation approveStation(Integer stationId, String username, String password) {
        if (stationRepo.existsByStationUsername(username)) {
            throw new IllegalArgumentException("Station username already exists.");
        }
        FuelStation station = stationRepo.findById(stationId)
                .orElseThrow(() -> new RuntimeException("Station not found"));

        station.setIsApproved(true);
        station.setStationUsername(username);
        station.setStationPassword(password); // Recommend encrypting this

        return stationRepo.save(station);
    }
}
