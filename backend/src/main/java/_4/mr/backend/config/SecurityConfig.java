package _4.mr.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
               // .csrf().disable() // Désactiver CSRF pour simplifier, ne pas utiliser en production
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/users/forgot-password", "/api/users/verify-otp", "/api/users/reset-password").permitAll()
                        .anyRequest().authenticated()
                );
                //.formLogin().disable(); // Désactiver la connexion par formulaire si non utilisé
        return http.build();
    }
}
