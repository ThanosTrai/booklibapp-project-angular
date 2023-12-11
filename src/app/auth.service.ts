import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, finalize, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private tokenKey: string = 'access_token';
  private refreshTokenKey: string = 'refresh_token';
  
  constructor(private appService: AppService) { }

  // Checks if the user is currently logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  }
  
  // Ensures the user is authenticated and refreshes token if needed
  ensureAuthenticated(): Observable<boolean> {
    if (this.isLoggedIn()) {
      return of(true);
    } else if (this.isRefreshTokenNearExpiry()) {
      return this.refreshToken().pipe(
        tap((tokens: { accessToken: string, refreshToken: string }) => {
          this.saveToken(tokens.accessToken, tokens.refreshToken);
        }),
        map(() => true),
        catchError((error) => {
          this.logout();
          return of(false);
        })
      );
    } else {
      return of(false);
    }
  }

  // Checks if the refresh token is about to expire
  isRefreshTokenNearExpiry(): boolean {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return true; // consider expired if not present
    }

    // Decoding JWT to get the payload
  const payload = JSON.parse(atob(refreshToken.split('.')[1]));
  const expiryTime = payload.exp;
  const currentTime = Date.now() / 1000;

  // Check if the refresh token is going to expire within the next day
  const isExpiringSoon = expiryTime < (currentTime + 86400);
  return isExpiringSoon;

  }

  // Retrieves the current access token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Extracts the user ID from the JWT token
  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.userId;
  }

  // Saves the access and refresh token to local storage
  saveToken(token: string, refreshToken?: string): void {
    localStorage.setItem(this.tokenKey, token);
    if (refreshToken) {
      localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
  }

  // Retrieves the current refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  // Removes the tokens from local storage
  removeTokens(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  // Logs the user out
  logout(): void {
    this.removeTokens();
  }

  // Refreshes the access token using the refresh token
  refreshToken(): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null); // Clear any old refresh token
  
      const refreshToken = localStorage.getItem(this.refreshTokenKey);
      if (!refreshToken) {
        this.isRefreshing = false;
        return throwError(() => new Error('No refresh token available'));
      }
  
      return this.appService.refreshToken(refreshToken).pipe(
        tap((tokens: { accessToken: string, refreshToken?: string }) => {
          localStorage.setItem(this.tokenKey, tokens.accessToken);
          if (tokens.refreshToken) {
            localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
          }
          this.refreshTokenSubject.next(tokens.accessToken);
        }),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      // Wait until the current refresh is done
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(jwt => {
          return of(jwt);
        })
      );
    }
  }
}
