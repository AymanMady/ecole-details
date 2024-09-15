package _4.mr.backend.controllers;

import _4.mr.backend.model.Ecole;
import _4.mr.backend.service.EcoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ecoles")
public class EcoleController {

    @Autowired
    private EcoleService ecoleService;


    @GetMapping("/ecoles")
    public List<Ecole> getAllEcoles() {
        return ecoleService.getAllEcoles();
    }


    @GetMapping("/ecole/{id}")
    public ResponseEntity<Ecole> getEcoleById(@PathVariable int id) {
        Optional<Ecole> ecole = ecoleService.getEcoleById(id);
        return ecole.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public Ecole createEcole(@RequestBody Ecole ecole) {
        return ecoleService.addEcole(ecole);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Ecole> updateEcole(@PathVariable int id, @RequestBody Ecole updatedEcole) {
        Ecole ecole = ecoleService.updateEcole(id, updatedEcole);
        if (ecole != null) {
            return ResponseEntity.ok(ecole);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEcole(@PathVariable int id) {
        ecoleService.deleteEcole(id);
        return ResponseEntity.noContent().build();
    }
}
