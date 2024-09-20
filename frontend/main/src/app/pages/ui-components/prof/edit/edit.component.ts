import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ProfService } from '../../../../services/prof.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prof } from '../../../../models/prof.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-prof',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './edit.component.html',
})
export class EditProfComponent implements OnInit {
  editForm: FormGroup;
  selectedProf: Prof | null = null;

  constructor(
    private profService: ProfService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const profId = this.route.snapshot.paramMap.get('id');
    if (profId) {
      this.loadProfDetails(profId);
    }
  }

  loadProfDetails(id: string) {
    this.profService.getProfById(id).subscribe((prof: Prof) => {
      this.selectedProf = prof;
      this.editForm.patchValue({
        id: prof.id,
        nom: prof.nom,
        prenom: prof.prenom,
        adresse: prof.adresse,
        email: prof.email,
        telephone: prof.telephone,
      });
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedProf = this.editForm.value;
      this.profService.updateProf(updatedProf.id, updatedProf).subscribe({
        next: (response) => {
          console.log('Professeur mis à jour avec succès', response);
          this.router.navigate(['/ui-components/profs']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du professeur', error);
        },
      });
    }
  }
  
}
