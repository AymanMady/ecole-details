package _4.mr.backend.Controllers;

import _4.mr.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        // Generate and send OTP
        userService.generateAndSendOtp(email);
        return ResponseEntity.ok("OTP sent to " + email);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        if (userService.verifyOtp(email, otp)) {
            return ResponseEntity.ok("OTP verified successfully. Proceed to reset password.");
        } else {
            return ResponseEntity.status(400).body("Invalid OTP.");
        }
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
