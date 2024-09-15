package _4.mr.backend.controllers;

import _4.mr.backend.model.Classe;
import _4.mr.backend.service.ClasseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("classes")
public class ClasseController {

    @Autowired
    private ClasseService classeService;

    @GetMapping
    public List<Classe> getAllClasses() {
        return classeService.getAllClasses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Classe> getClasseById(@PathVariable int id) {
        Optional<Classe> classe = classeService.getClasseById(id);
        return classe.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping
    public Classe createClasse(@RequestBody Classe classe) {
        return classeService.addClasse(classe);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Classe> updateClasse(@PathVariable int id, @RequestBody Classe updatedClasse) {
        Classe classe = classeService.updateClasse(id, updatedClasse);
        if (classe != null) {
            return ResponseEntity.ok(classe);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClasse(@PathVariable int id) {
        classeService.deleteClasse(id);
        return ResponseEntity.noContent().build();
    }
}
