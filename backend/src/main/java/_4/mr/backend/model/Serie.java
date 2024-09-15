package _4.mr.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "series")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Serie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String libelle_serie;

    // Relation ManyToOne avec Ecole
    @ManyToOne
    @JoinColumn(name = "ecole_id")
    private Ecole ecole;
}
