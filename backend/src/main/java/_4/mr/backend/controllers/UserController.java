package _4.mr.backend.controllers;

import _4.mr.backend.service.UserService;
import _4.mr.backend.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {

    @Autowired
    private UserService userService;



    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        boolean isOtpValid = userService.verifyOtp(email,otp);
        if (isOtpValid) {
            return ResponseEntity.ok("Votre email a été vérifié avec succès.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("OTP invalide.");
    }



    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        // Generate and send OTP
        userService.generateAndSendOtp(email);
        System.out.println(userService.generateAndSendOtp(email));
        return ResponseEntity.ok("OTP sent to " + email);
    }



    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        if (userService.verifyOtp(email, request.get("otp"))) {
            userService.resetPassword(email, newPassword);
            return ResponseEntity.ok("Password reset successfully.");
        } else {
            return ResponseEntity.status(400).body("OTP not verified. Cannot reset password.");
        }
    }
}
