import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AuthService } from '../auth.service'; // Importer le service d'authentification

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  form: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    // Création du formulaire avec les champs
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
      role: new FormControl('admin'), // Le rôle par défaut est 'admin'
    }, { validators: this.passwordMatchValidator });
  }

  // Validateur personnalisé pour vérifier si les mots de passe correspondent
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      // Soumettre le formulaire si valide
      this.authService.signup(this.form.value).subscribe(
        (res) => {
          console.log('Inscription réussie', res);
          this.authService.setEmail(this.form.value.email); // Stocker l'email
          this.router.navigate(['/authentication/verify-otp']);
        },
        (error) => {
          console.error('Erreur d\'inscription', error);
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }
}
