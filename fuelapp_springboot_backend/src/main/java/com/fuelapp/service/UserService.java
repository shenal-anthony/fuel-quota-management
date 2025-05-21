package com.fuelapp.service;

import com.fuelapp.dto.UserRegisterDto;
import com.fuelapp.model.Role;
import com.fuelapp.model.User;
import com.fuelapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(UserRegisterDto userDto,String usertype) {
        // Set default role and encode password
        // Check if username already exists
        if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists.");
        }
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setNic(userDto.getNic());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(usertype.equals("vehicleOwner")){
            user.setRole(Role.ROLE_USER);
        } else if (usertype.equals("stationOwner")) {
            user.setRole(Role.ROLE_STATION);
        } else if (usertype.equals("admin")) {
            user.setRole(Role.ROLE_ADMIN);
        }

        return userRepository.save(user);
    }
}
