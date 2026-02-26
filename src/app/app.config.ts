import { ApplicationConfig, provideZoneChangeDetection, ErrorHandler, Injectable } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

@Injectable()
class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Angular Error:', error);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ]
};
