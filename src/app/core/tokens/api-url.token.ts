import { InjectionToken } from '@angular/core';

// Custom DI token demonstrates advanced dependency injection concept.
export const API_URL_TOKEN = new InjectionToken<string>('API_URL_TOKEN', {
  providedIn: 'root',
  factory: () => 'https://api.example.com'
});
