import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password', // Changer pour cohérence
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './forgot-password.component.html', // Vérifier si c'est bien le template correct
})
export class AppForgotPasswordComponent  {
  form: FormGroup;
  message: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Initialisation du formulaire avec validation de l'email
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  // Méthode pour accéder facilement aux contrôles du formulaire
  get f() {
    return this.form.controls;
  }

  // Méthode soumise lors de l'envoi du formulaire
  submit() {
    if (this.form.invalid) {
      return;
    }

    const email = this.form.value.email;
    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.message = response; // Affichage d'un message de succès
        this.errorMessage = null;
        this.router.navigate(['/authentication/reset-password']);
      },
      error: (err) => {
        this.errorMessage = err.error; // Affichage de l'erreur si la requête échoue
        this.message = null;
      }
    });
  }
}
