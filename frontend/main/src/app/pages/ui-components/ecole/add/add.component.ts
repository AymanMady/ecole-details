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
import { EcoleService } from '../../../../services/ecole.service';
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


export class AddEcoleComponent {
  ecoleForm: FormGroup;

  constructor(private router: Router,private fb: FormBuilder, private ecoleService: EcoleService) {
    this.ecoleForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.ecoleForm.valid) {
      const ecole = this.ecoleForm.value;
      this.ecoleService.createEcole(ecole).subscribe({
        next: (response) => {
          console.log('Ecole ajoutée avec succès', response);
          this.router.navigate(['/ui-components/ecoles']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de l\'école', error);
        },
      });
    }
  }
}
