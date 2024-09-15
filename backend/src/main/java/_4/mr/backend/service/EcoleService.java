package _4.mr.backend.service;

import _4.mr.backend.model.Ecole;
import _4.mr.backend.repository.EcoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EcoleService {

    @Autowired
    private EcoleRepository ecoleRepository;


    public List<Ecole> getAllEcoles() {
        return ecoleRepository.findAll();
    }


    public Optional<Ecole> getEcoleById(int id) {
        return ecoleRepository.findById(id);
    }


    public Ecole addEcole(Ecole ecole) {
        return ecoleRepository.save(ecole);
    }


    public Ecole updateEcole(int id, Ecole updatedEcole) {
        Optional<Ecole> existingEcole = ecoleRepository.findById(id);
        if (existingEcole.isPresent()) {
            Ecole ecole = existingEcole.get();
            ecole.setNom(updatedEcole.getNom());
            ecole.setAdresse(updatedEcole.getAdresse());
            return ecoleRepository.save(ecole);
        } else {
            return null;
        }
    }


    public void deleteEcole(int id) {
        ecoleRepository.deleteById(id);
    }
}
