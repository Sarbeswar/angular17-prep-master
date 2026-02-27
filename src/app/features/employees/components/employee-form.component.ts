import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee, EmployeePayload } from '../models/employee.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <section class="card">
      <h3>{{ selectedEmployee ? 'Update Employee' : 'Add Employee' }}</h3>

      <form (ngSubmit)="onSubmit()">
        <label>
          Name
          <input [(ngModel)]="form.name" name="name" required />
        </label>

        <label>
          Email
          <input [(ngModel)]="form.email" name="email" type="email" required />
        </label>

        <label>
          Department
          <select [(ngModel)]="form.department" name="department">
            <option>Engineering</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Sales</option>
          </select>
        </label>

        <label>
          Experience Years
          <input [(ngModel)]="form.experienceYears" name="experienceYears" type="number" min="0" />
        </label>

        <label>
          <input [(ngModel)]="form.active" name="active" type="checkbox" /> Active
        </label>

        <button type="submit">{{ selectedEmployee ? 'Update' : 'Create' }}</button>
        <button type="button" *ngIf="selectedEmployee" (click)="cancelEdit.emit()">Cancel</button>
      </form>
    </section>
  `
})
// Form component demonstrates two-way binding, event binding and ngOnChanges lifecycle hook.
export class EmployeeFormComponent implements OnChanges {
  @Input() selectedEmployee: Employee | null = null;
  @Output() create = new EventEmitter<EmployeePayload>();
  @Output() update = new EventEmitter<{ id: number; payload: EmployeePayload }>();
  @Output() cancelEdit = new EventEmitter<void>();

  form: EmployeePayload = this.defaultForm();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedEmployee']) {
      this.form = this.selectedEmployee
        ? {
            name: this.selectedEmployee.name,
            email: this.selectedEmployee.email,
            department: this.selectedEmployee.department,
            experienceYears: this.selectedEmployee.experienceYears,
            active: this.selectedEmployee.active
          }
        : this.defaultForm();
    }
  }

  onSubmit(): void {
    if (this.selectedEmployee) {
      this.update.emit({ id: this.selectedEmployee.id, payload: this.form });
      return;
    }
    this.create.emit(this.form);
    this.form = this.defaultForm();
  }

  private defaultForm(): EmployeePayload {
    return {
      name: '',
      email: '',
      department: 'Engineering',
      experienceYears: 0,
      active: true
    };
  }
}
