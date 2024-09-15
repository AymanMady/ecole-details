package _4.mr.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "prix")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Prix {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private double montant;


    @ManyToOne
    @JoinColumn(name = "ecole_id")
    private Ecole ecole;

    @ManyToOne
    @JoinColumn(name = "classe_id")
    private Classe classe;
}
