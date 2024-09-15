import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MaterialModule
  ],
  templateUrl: './reset-password.component.html',
})
export class AppResetPasswordComponent {
  form: FormGroup;
  message: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      otp: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const { email, otp, newPassword } = this.form.value;

      this.authService.resetPassword(email, otp, newPassword).subscribe({
        next: (response) => {
          console.log(response)
          this.message = response;
          this.errorMessage = null;
          this.router.navigate(['/authentication/login']);
        },
        error: (error) => {
          console.log(error)
          this.errorMessage = error.error;
          this.message = null;
        }
      });
    }
  }
}
