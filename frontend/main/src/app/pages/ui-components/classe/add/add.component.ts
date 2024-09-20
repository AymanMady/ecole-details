import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasseService } from '../../../../services/classe.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add',
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
    RouterModule,
  ],
  templateUrl: './add.component.html',
})

export class AddClasseComponent {
  classeForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private classeService: ClasseService) {
    this.classeForm = this.fb.group({
      libelle_classe: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.classeForm.valid) {
      const classe = this.classeForm.value;
      this.classeService.createClasse(classe).subscribe({
        next: (response) => {
          console.log('Classe ajoutée avec succès', response);
          this.router.navigate(['/ui-components/classes']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la classe', error);
        },
      });
    }
  }
}
