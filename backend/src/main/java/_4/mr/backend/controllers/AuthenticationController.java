package _4.mr.backend.controllers;

import _4.mr.backend.dtos.AuthenticationDTO;
import _4.mr.backend.dtos.AuthenticationResponse;
import _4.mr.backend.model.User;
import _4.mr.backend.repository.UserRepository;
import _4.mr.backend.service.jwt.UserDetailsServiceImpl;
import _4.mr.backend.util.JwtUtil;
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
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationDTO authenticationDTO) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationDTO.getEmail(), authenticationDTO.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Identifiant ou mot de passe incorrect !");
        } catch (DisabledException e) {
            throw new DisabledException("Le compte utilisateur est désactivé.");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationDTO.getEmail());

        Optional<User> optionalUser = userRepository.findByEmail(authenticationDTO.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (!user.isActive()) {
                throw new IllegalStateException("L'utilisateur n'est pas activé. Veuillez vérifier votre email.");
            }
        } else {
            throw new UsernameNotFoundException("Utilisateur non trouvé !");
        }

        final String jwt = jwtUtil.generateToken(userDetails.getUsername());
        return new AuthenticationResponse(jwt);
    }
}
