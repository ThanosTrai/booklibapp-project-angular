import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './auth-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
        importProvidersFrom(HttpClientModule), 
        provideAnimations(), 
        provideRouter(routes)
      ],
};
