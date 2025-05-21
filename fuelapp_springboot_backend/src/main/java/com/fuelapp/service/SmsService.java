package com.fuelapp.service;

import org.springframework.stereotype.Service;

@Service
public class SmsService {
    public void sendSMS(String toPhone, String message) {
        // Call Twilio (or other provider) here
        System.out.printf("SIMULATED SMS to %s:\n%s\n", toPhone, message);
    }
}
