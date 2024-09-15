import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';
import { AppVerifyOtpComponent } from './verify-otp/verify-otp.component';
import { AppForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppResetPasswordComponent } from './reset-password/reset-password.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
      {
        path: 'verify-otp',
        component: AppVerifyOtpComponent,
      },
      {
        path: 'forgot-password',
        component: AppForgotPasswordComponent,
      },
      {
        path: 'reset-password',
        component: AppResetPasswordComponent,
      },
    ],
  },
];
