package _4.mr.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "profs")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Prof {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom;
    private String prenom;
    private String adresse;
    private String email;
    private String telephone;
    private String photo;

    @ManyToOne
    @JoinColumn(name = "ecole_id")
    private Ecole ecole;
}
