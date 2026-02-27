import { Employee } from '../features/employees/models/employee.model';

// In-memory seed data used in place of backend for interview-friendly setup.
export const EMPLOYEE_SEED: Employee[] = [
  {
    id: 1,
    name: 'Anita Rao',
    email: 'anita.rao@corp.dev',
    department: 'Engineering',
    experienceYears: 5,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Rahul Nair',
    email: 'rahul.nair@corp.dev',
    department: 'Finance',
    experienceYears: 3,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
