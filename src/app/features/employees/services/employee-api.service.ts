import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Employee, EmployeePayload } from '../models/employee.model';
import { EMPLOYEE_SEED } from '../../../data/employees.seed';

@Injectable({
  providedIn: 'root'
})
// Service simulates HttpClient calls using RxJS observables (CRUD operations).
export class EmployeeApiService {
  private employees = [...EMPLOYEE_SEED];

  getAll(): Observable<Employee[]> {
    return of(this.employees).pipe(delay(200));
  }

  create(payload: EmployeePayload): Observable<Employee> {
    const now = new Date().toISOString();
    const employee: Employee = {
      ...payload,
      id: Math.max(0, ...this.employees.map((e) => e.id)) + 1,
      createdAt: now,
      updatedAt: now
    };
    this.employees = [...this.employees, employee];
    return of(employee).pipe(delay(200));
  }

  update(id: number, payload: EmployeePayload): Observable<Employee | null> {
    let updated: Employee | null = null;

    this.employees = this.employees.map((employee) => {
      if (employee.id !== id) {
        return employee;
      }

      updated = {
        ...employee,
        ...payload,
        updatedAt: new Date().toISOString()
      };

      return updated;
    });

    return of(updated).pipe(delay(200));
  }

  delete(id: number): Observable<boolean> {
    const before = this.employees.length;
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return of(before !== this.employees.length).pipe(delay(200));
  }
}
