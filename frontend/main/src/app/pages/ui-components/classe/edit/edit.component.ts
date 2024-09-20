import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasseService } from '../../../../services/classe.service'; // Remplacez par le service approprié
import { Classe } from '../../../../models/classe.model'; // Remplacez par le modèle approprié
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  templateUrl: './edit.component.html',
})
export class EditClasseComponent implements OnInit {
  editForm: FormGroup;
  selectedClasse: Classe | null = null;

  constructor(
    private classeService: ClasseService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      id: [''],
      libelle_classe: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const classeId = this.route.snapshot.paramMap.get('id');
    if (classeId) {
      this.loadClasseDetails(classeId);
    }
  }

  loadClasseDetails(id: string) {
    this.classeService.getClasseById(id).subscribe((classe: Classe) => {
      this.selectedClasse = classe;
      this.editForm.patchValue({
        id: classe.id,
        libelle_classe: classe.libelle_classe,
      });
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedClasse = this.editForm.value;
      this.classeService.updateClasse(updatedClasse.id, updatedClasse).subscribe({
        next: (response) => {
          console.log('Classe mise à jour avec succès', response);
          this.router.navigate(['/ui-components/classes']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la classe', error);
        },
      });
    }
  }
}
