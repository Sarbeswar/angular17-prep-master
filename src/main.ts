import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { loggingInterceptor } from './app/core/interceptors/logging.interceptor';

// Angular 17 bootstrap entry point:
// - replaces old AppModule bootstrap flow with standalone bootstrapApplication.
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([loggingInterceptor]))
  ]
}).catch((error) => console.error(error));
