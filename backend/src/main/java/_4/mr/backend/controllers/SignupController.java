package _4.mr.backend.controllers;


import _4.mr.backend.dtos.SignupDTO;
import _4.mr.backend.dtos.UserDTO;
import _4.mr.backend.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SignupController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> signupUser(@RequestBody SignupDTO signupDTO) {
       UserDTO createdUser = authService.createUser(signupDTO);
       if (createdUser == null){
           return new ResponseEntity<>("User not created, come again later!", HttpStatus.BAD_REQUEST);
       }
       return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

}
