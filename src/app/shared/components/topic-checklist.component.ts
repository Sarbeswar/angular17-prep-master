import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-topic-checklist',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="card">
      <h3>Angular 17 Concepts Covered</h3>
      <ul>
        <li *ngFor="let item of topics">{{ item }}</li>
      </ul>
    </section>
  `
})
// Reusable presentational component (parent-to-child via @Input).
export class TopicChecklistComponent {
  @Input() topics: string[] = [];
}
