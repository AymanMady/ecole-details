import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './verify-otp.component.html',
})
export class AppVerifyOtpComponent implements OnInit {
  form: FormGroup;
  email: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
    this.email = this.authService.getEmail();
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid && this.email) {
      const otp = this.form.value.code;
      this.authService.verifyOtp(this.email, otp).subscribe(
        (response) => {
          console.log('Vérification réussie', response);
          this.router.navigate(['/authentication/login']); 
        },
        (error) => {
          console.error('Erreur de vérification', error);
        }
      );
    } else {
      console.log('Formulaire invalide ou email manquant');
    }
  }
}
