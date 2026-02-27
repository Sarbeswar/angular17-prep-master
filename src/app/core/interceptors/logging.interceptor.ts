import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

// Functional interceptor in Angular 17 to observe HTTP request/response flow.
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startedAt = performance.now();

  return next(req).pipe(
    tap(() => {
      const duration = (performance.now() - startedAt).toFixed(2);
      console.log(`[HTTP] ${req.method} ${req.url} (${duration} ms)`);
    })
  );
};
