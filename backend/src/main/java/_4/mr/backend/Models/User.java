package _4.mr.backend.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique=true, nullable = false)
    private String name;
    @Column(unique=true, nullable = false)
    private String email;
    private String password;
    @Column(unique=true, nullable = false, length = 8)
    private int phone;
    private String role;
    private String otp;

}
