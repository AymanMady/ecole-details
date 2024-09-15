package _4.mr.backend.service;

import _4.mr.backend.model.Prof;
import _4.mr.backend.repository.ProfRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfService {

    @Autowired
    private ProfRepository profRepository;


    public List<Prof> getAllProfs() {
        return profRepository.findAll();
    }


    public Optional<Prof> getProfById(int id) {
        return profRepository.findById(id);
    }


    public Prof addProf(Prof prof) {
        return profRepository.save(prof);
    }


    public Prof updateProf(int id, Prof updatedProf) {
        Optional<Prof> existingProf = profRepository.findById(id);
        if (existingProf.isPresent()) {
            Prof prof = existingProf.get();
            prof.setNom(updatedProf.getNom());
            prof.setPrenom(updatedProf.getPrenom());
            prof.setAdresse(updatedProf.getAdresse());
            prof.setEmail(updatedProf.getEmail());
            prof.setTelephone(updatedProf.getTelephone());
            prof.setPhoto(updatedProf.getPhoto());
            prof.setEcole(updatedProf.getEcole());
            return profRepository.save(prof);
        } else {
            return null;
        }
    }


    public void deleteProf(int id) {
        profRepository.deleteById(id);
    }
}
