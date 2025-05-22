package com.fuelapp.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FuelStationRequestDTO {
    private String stationName;
    private String addressNo;
    private String streetName;
    private String city;
    private String district;
    private String province;
    private String contactNumber;
    private String email;
    private Integer userId; // ID of the currently logged-in station owner
}
