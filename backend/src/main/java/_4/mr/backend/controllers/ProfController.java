package _4.mr.backend.controllers;

import _4.mr.backend.model.Prof;
import _4.mr.backend.service.ProfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/profs")
public class ProfController {

    @Autowired
    private ProfService profService;


    @GetMapping
    public List<Prof> getAllProfs() {
        return profService.getAllProfs();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Prof> getProfById(@PathVariable int id) {
        Optional<Prof> prof = profService.getProfById(id);
        return prof.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping
    public Prof createProf(@RequestBody Prof prof) {
        return profService.addProf(prof);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Prof> updateProf(@PathVariable int id, @RequestBody Prof updatedProf) {
        Prof prof = profService.updateProf(id, updatedProf);
        if (prof != null) {
            return ResponseEntity.ok(prof);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProf(@PathVariable int id) {
        profService.deleteProf(id);
        return ResponseEntity.noContent().build();
    }
}
