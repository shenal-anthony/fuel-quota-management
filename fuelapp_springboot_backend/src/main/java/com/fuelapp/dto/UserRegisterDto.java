package com.fuelapp.dto;

import com.fuelapp.model.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterDto {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String nic;
    private String phoneNumber;
    private String email;

}
