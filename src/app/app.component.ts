import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="container">
      <h1>Angular 17 Employee Management CRUD</h1>
      <p>
        Interview-prep style project covering components, directives, pipes,
        services, DI, lifecycle hooks, observables, RxJS, and TypeScript basics.
      </p>
      <router-outlet></router-outlet>
    </main>
  `
})
// Root component is the bootstrapped UI shell.
export class AppComponent {}
