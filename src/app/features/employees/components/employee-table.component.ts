import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { Employee } from '../models/employee.model';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import { ExperienceLevelPipe } from '../../../shared/pipes/experience-level.pipe';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, HighlightDirective, ExperienceLevelPipe],
  template: `
    <section class="card">
      <h3>Employee Table</h3>

      <table *ngIf="employees.length; else noData" style="width: 100%; border-collapse: collapse">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let employee of employees" [appHighlight]="'#f3fbff'">
            <td>{{ employee.name }}</td>
            <td>{{ employee.department }}</td>
            <td>{{ employee.experienceYears | experienceLevel:true }}</td>
            <td [style.color]="employee.active ? 'green' : 'crimson'">
              {{ employee.active ? 'Active' : 'Inactive' }}
            </td>
            <td>{{ employee.updatedAt | date:'medium' }}</td>
            <td>
              <button (click)="edit.emit(employee)">Edit</button>
              <button (click)="remove.emit(employee.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <ng-template #noData>
        <p>No employees found. Add your first record.</p>
      </ng-template>
    </section>
  `
})
// Table component demonstrates interpolation, property binding, event binding, directives, and pipes.
export class EmployeeTableComponent {
  @Input() employees: Employee[] = [];
  @Output() edit = new EventEmitter<Employee>();
  @Output() remove = new EventEmitter<number>();
}
