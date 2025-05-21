package com.fuelapp.controller;

import com.fuelapp.dto.UserRegisterDto;
import com.fuelapp.model.User;
import com.fuelapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegisterDto dto) {
        User registeredUser = userService.registerUser(dto);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }
}
