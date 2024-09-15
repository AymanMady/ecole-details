import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { AppSideLoginComponent } from './authentication/side-login/side-login.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppSideLoginComponent,
    data: {
      title: 'Starter',
      urls: [
        { title: 'login', url: '/login' },
        { title: 'Starter' },
      ],
    },
  },
];
