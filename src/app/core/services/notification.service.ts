import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// Root-provided singleton service for user-friendly notifications.
export class NotificationService {
  success(message: string): void {
    console.log(`✅ ${message}`);
  }

  info(message: string): void {
    console.log(`ℹ️ ${message}`);
  }
}
