import { Routes } from '@angular/router';

// ui

import { AppHomeComponent } from './home/home.component';
import { AllEcolesComponent } from './ecole/all/all.component';
import { AddEcoleComponent } from './ecole/add/add.component';
import { EditEcoleComponent } from './ecole/edit/edit.component';
import { AllClassesComponent } from './classe/all/all.component';
import { AddClasseComponent } from './classe/add/add.component';
import { EditClasseComponent } from './classe/edit/edit.component';
import { AllProfsComponent } from './prof/all/all.component';
import { AddProfComponent } from './prof/add/add.component';
import { EditProfComponent } from './prof/edit/edit.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: AppHomeComponent,
      },
      {
        path: 'ecoles',
        component: AllEcolesComponent,
      },
      {
        path: 'ecoles/add',
        component: AddEcoleComponent,
      },
      {
        path: 'ecoles/edit/:id',
        component: EditEcoleComponent,
      },
      {
        path: 'classes',
        component: AllClassesComponent,
      },
      {
        path: 'classes/add',
        component: AddClasseComponent,
      },
      {
        path: 'classes/edit/:id',
        component: EditClasseComponent,
      },
      {
        path: 'profs',
        component: AllProfsComponent,
      },
      {
        path: 'profs/add',
        component: AddProfComponent,
      },
      {
        path: 'profs/edit/:id',
        component: EditProfComponent,
      },
    ],
  },
];
