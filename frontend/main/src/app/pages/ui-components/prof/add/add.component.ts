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
import { ProfService } from '../../../../services/prof.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-prof',
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
export class AddProfComponent {
  profForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private profService: ProfService) {
    this.profForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.profForm.valid) {
      const prof = this.profForm.value;
      this.profService.createProf(prof).subscribe({
        next: (response) => {
          console.log('Prof ajouté avec succès', response);
          this.router.navigate(['/ui-components/profs']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du prof', error);
        },
      });
    }
  }
}
