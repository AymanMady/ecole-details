package _4.mr.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true, nullable = false)
    private String name;
    @Column(unique=true, nullable = false)
    private String email;
    private String password;
    @Column(unique=true, nullable = false, length = 8)
    private String phoneNumber;
    private String role;
    private String otp;

}
