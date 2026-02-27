import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Employee, EmployeePayload } from '../models/employee.model';
import { EmployeeApiService } from '../services/employee-api.service';
import { EmployeeFormComponent } from '../components/employee-form.component';
import { EmployeeTableComponent } from '../components/employee-table.component';
import { TopicChecklistComponent } from '../../../shared/components/topic-checklist.component';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-employee-list-page',
  standalone: true,
  imports: [NgIf, EmployeeFormComponent, EmployeeTableComponent, TopicChecklistComponent],
  template: `
    <section class="grid grid-2">
      <app-employee-form
        [selectedEmployee]="selectedEmployee"
        (create)="createEmployee($event)"
        (update)="updateEmployee($event.id, $event.payload)"
        (cancelEdit)="selectedEmployee = null"
      ></app-employee-form>

      <app-topic-checklist [topics]="topics"></app-topic-checklist>
    </section>

    <section style="margin-top: 1rem">
      <app-employee-table
        [employees]="employees"
        (edit)="selectedEmployee = $event"
        (remove)="deleteEmployee($event)"
      ></app-employee-table>
    </section>

    <p *ngIf="loading">Loading employee data...</p>
  `
})
// Smart/container component demonstrates lifecycle hooks, RxJS subscription management, and CRUD orchestration.
export class EmployeeListPageComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  loading = false;

  readonly topics = [
    'Angular Framework + CLI + bootstrap flow',
    'Components + standalone and module reference',
    'Data binding: interpolation/property/event/two-way',
    'Directives: *ngIf, *ngFor, custom attribute',
    'Decorators + built-in/custom pipes',
    'Services + Dependency Injection + provider scope',
    'Lifecycle hooks: ngOnInit/ngOnDestroy/ngOnChanges',
    'Observable + RxJS operators and async CRUD simulation',
    'TypeScript basics and strong typing'
  ];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly employeeApiService: EmployeeApiService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  createEmployee(payload: EmployeePayload): void {
    this.employeeApiService
      .create(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe((employee) => {
        this.employees = [...this.employees, employee];
        this.notificationService.success('Employee created successfully.');
      });
  }

  updateEmployee(id: number, payload: EmployeePayload): void {
    this.employeeApiService
      .update(id, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe((employee) => {
        if (!employee) {
          return;
        }
        this.employees = this.employees.map((item) => (item.id === id ? employee : item));
        this.selectedEmployee = null;
        this.notificationService.success('Employee updated successfully.');
      });
  }

  deleteEmployee(id: number): void {
    this.employeeApiService
      .delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((deleted) => {
        if (!deleted) {
          return;
        }
        this.employees = this.employees.filter((employee) => employee.id !== id);
        this.notificationService.info('Employee deleted successfully.');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadEmployees(): void {
    this.loading = true;
    this.employeeApiService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((employees) => {
        this.employees = employees;
        this.loading = false;
      });
  }
}
