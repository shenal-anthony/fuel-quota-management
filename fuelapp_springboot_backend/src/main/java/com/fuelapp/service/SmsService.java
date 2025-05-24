package com.fuelapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
// import com.twilio.Twilio;
// import com.twilio.rest.api.v2010.account.Message;
// import com.twilio.type.PhoneNumber;

@Service
public class SmsService {

    // These would come from application.properties
    @Value("${twilio.account.sid:demo}")
    private String twilioAccountSid;

    @Value("${twilio.auth.token:demo}")
    private String twilioAuthToken;

    @Value("${twilio.phone.number:+1234567890}")
    private String twilioPhoneNumber;

    public void sendSMS(String toPhone, String message) {
        try {
            // For development - just log
            if ("demo".equals(twilioAccountSid)) {
                System.out.printf("SIMULATED SMS to %s:\n%s\n", toPhone, message);
                return;
            }

            // Uncomment below for real Twilio integration
            /*
            Twilio.init(twilioAccountSid, twilioAuthToken);

            Message twilioMessage = Message.creator(
                new PhoneNumber(toPhone),
                new PhoneNumber(twilioPhoneNumber),
                message
            ).create();

            System.out.printf("SMS sent successfully. SID: %s\n", twilioMessage.getSid());
            */

        } catch (Exception e) {
            System.err.printf("Failed to send SMS: %s\n", e.getMessage());
            throw new RuntimeException("SMS sending failed", e);
        }
    }
}