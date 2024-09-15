package _4.mr.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Table(name = "ecoles")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Ecole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom;
    private String adresse;


    @OneToMany(mappedBy = "ecole", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Serie> series;


    @OneToMany(mappedBy = "ecole", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Prof> profs;


    @OneToMany(mappedBy = "ecole", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Prix> prix;
}
