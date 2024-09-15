import { Routes } from '@angular/router';

// ui
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { AppEcolesComponent } from './ecoles/ecoles.component';
import { AppHomeComponent } from './home/home.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: AppHomeComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
      {
        path: 'ecoles',
        component: AppEcolesComponent,
      },
    ],
  },
];
