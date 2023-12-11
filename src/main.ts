/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { appConfig } from './app/app.config';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

const appProviders = [
  provideRouter(routes),
  provideAnimations(),
  provideToastr({
    timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
  })
  
];

bootstrapApplication(AppComponent, {
  providers: [...appConfig.providers, ...appProviders, HttpClientModule, provideAnimations()] 
}).catch(err => console.error(err));


