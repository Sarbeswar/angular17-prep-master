import { Routes } from '@angular/router';
import { EmployeeListPageComponent } from './features/employees/pages/employee-list-page.component';

// Router configuration demonstrates Angular routing concept.
export const appRoutes: Routes = [
  {
    path: '',
    component: EmployeeListPageComponent,
    title: 'Employee Management Dashboard'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
