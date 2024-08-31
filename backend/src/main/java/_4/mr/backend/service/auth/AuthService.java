package _4.mr.backend.service.auth;


import _4.mr.backend.dtos.SignupDTO;
import _4.mr.backend.dtos.UserDTO;

public interface AuthService {
    UserDTO createUser(SignupDTO signupDTO);
}
