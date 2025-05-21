package com.fuelapp.controller;

import com.fuelapp.dto.UserRegisterDto;
import com.fuelapp.model.User;
import com.fuelapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/signup")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/user")
    public ResponseEntity<User> registerUser(@RequestBody UserRegisterDto dto) {
        User registeredUser = userService.registerUser(dto,"vehicleOwner");
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }
    @PostMapping("/station-owner")
    public ResponseEntity<User> registerStationOwner(@RequestBody UserRegisterDto dto) {
        User registeredUser = userService.registerUser(dto,"stationOwner");
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }
    @PostMapping("/admin")
    public ResponseEntity<User> registerAdmin(@RequestBody UserRegisterDto dto) {
        User registeredUser = userService.registerUser(dto,"admin");
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }
}
