package _4.mr.backend.service.auth;

import _4.mr.backend.dtos.SignupDTO;
import _4.mr.backend.service.UserService;
import _4.mr.backend.dtos.UserDTO;
import _4.mr.backend.model.User;
import _4.mr.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Override
    public UserDTO createUser(SignupDTO signupDTO) {
        User user = new User();
        user.setName(signupDTO.getName());
        user.setEmail(signupDTO.getEmail());
        user.setPhoneNumber(signupDTO.getPhoneNumber());
        user.setRole(signupDTO.getRole());
        user.setActive(false);
        user.setPassword(new BCryptPasswordEncoder().encode(signupDTO.getPassword()));
        User createdUser = userRepository.save(user);

        // Generate and send OTP after user creation
        userService.generateAndSendOtp(user.getEmail());

        UserDTO userDTO = new UserDTO();
        userDTO.setId(createdUser.getId());
        userDTO.setEmail(createdUser.getEmail());
        userDTO.setName(createdUser.getName());
        userDTO.setPhoneNumber(createdUser.getPhoneNumber());
        userDTO.setRole(createdUser.getRole());
        return userDTO;
    }



}
