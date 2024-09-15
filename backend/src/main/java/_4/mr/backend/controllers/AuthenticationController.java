package _4.mr.backend.controllers;

import _4.mr.backend.dtos.AuthenticationDTO;
import _4.mr.backend.dtos.AuthenticationResponse;
import _4.mr.backend.model.User;
import _4.mr.backend.repository.UserRepository;
import _4.mr.backend.service.jwt.UserDetailsServiceImpl;
import _4.mr.backend.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AuthenticationController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationDTO authenticationDTO, HttpServletResponse response) throws BadCredentialsException, DisabledException, UsernameNotFoundException, IOException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationDTO.getEmail(), authenticationDTO.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password!");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationDTO.getEmail());

        Optional<User> optionalUser = userRepository.findByEmail(authenticationDTO.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (!user.isActive()) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "User is not activated. Please verify your email.");
                return null;
            }
        } else {
            throw new UsernameNotFoundException("User not found!");
        }

        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        return new AuthenticationResponse(jwt);
    }
}
