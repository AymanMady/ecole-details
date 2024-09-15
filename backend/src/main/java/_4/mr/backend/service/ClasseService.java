package _4.mr.backend.service;

import _4.mr.backend.model.Classe;
import _4.mr.backend.repository.ClasseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClasseService {

    @Autowired
    private ClasseRepository classeRepository;


    public List<Classe> getAllClasses() {
        return classeRepository.findAll();
    }


    public Optional<Classe> getClasseById(int id) {
        return classeRepository.findById(id);
    }


    public Classe addClasse(Classe classe) {
        return classeRepository.save(classe);
    }


    public Classe updateClasse(int id, Classe updatedClasse) {
        Optional<Classe> existingClasse = classeRepository.findById(id);
        if (existingClasse.isPresent()) {
            Classe classe = existingClasse.get();
            classe.setLibelle_classe(updatedClasse.getLibelle_classe());
            return classeRepository.save(classe);
        } else {
            return null;
        }
    }


    public void deleteClasse(int id) {
        classeRepository.deleteById(id);
    }
}
