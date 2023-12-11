import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {}

  // Main method to intercept HTTP requests
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add token to request header if is not a login or registration request
    if (!req.url.endsWith('/login') && !req.url.endsWith('/register')) {
    const authToken = this.authService.getToken();
    if (authToken) {
      req = this.addTokenHeader(req, authToken);
    }
  }

  // Handle the request and catch errors
  return next.handle(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized error
      if (error.status === 401) {
        return this.handle401Error(req, next);
      } else if (error.status === 404) {
        const errMsg = `Resource not found: ${req.url}`;
        return throwError(() => new Error(errMsg));
      } else if (error.status === 400 && error.error && error.error.errors) {
        return throwError(() => error);
      } else {
        const errMsg = (error.error instanceof ErrorEvent) 
                       ? error.error.message 
                       : `Error Code: ${error.status},  Message: ${error.message}`;
        return throwError(() => new Error(errMsg));
      }
    })
  );
  }

  // Helper to add token to request header
  private addTokenHeader(request: HttpRequest<any>, token: string | null) {
    if (token) {
      return request.clone({ setHeaders: { 'Authorization': `Bearer ${token}` } });
    }
    return request;
  }

  // Handle 401 Unauthorized error by attempting token refresh
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.authService.getRefreshToken();

      if (refreshToken) {
        // Wait for token refresh and resend request
        return this.authService.refreshToken().pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(token.accessToken);
            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.authService.logout();
            return throwError(() => new Error(err));
          }),
          finalize(() => {
            this.isRefreshing = false;
          })
        );
      } else {
        this.authService.logout();
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next.handle(this.addTokenHeader(request, jwt));
      })
    );
  }
}

