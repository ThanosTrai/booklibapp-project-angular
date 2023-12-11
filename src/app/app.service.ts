import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { RegisterUser } from './interfaces/registeruser';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LoginUser } from './interfaces/loginuser';
import { Book } from './interfaces/book';
import { AuthService } from './auth.service';
import { BookDetails } from './interfaces/book-details';
import { UserFavoritesResponse } from './interfaces/user-favorites-res';
import { UserUpdateInfo } from './interfaces/user-update-info';
import { UserProfile } from './interfaces/user-profile';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _authService: AuthService | null = null;

  private baseUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient, private injector: Injector) { }

  private get authService(): AuthService {
    if (!this._authService) {
      this._authService = this.injector.get(AuthService);
    }
    return this._authService;
  }

  registerUser(user: RegisterUser): Observable<any> {
    return this.http.post(`${this.baseUrl}api/auth/register`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  loginUser(user: LoginUser): Observable<any> {
    return this.http.post(`${this.baseUrl}api/auth/login`, user);
  }

  updateUser(userData: UserUpdateInfo): Observable<any> {
    return this.http.put(`${this.baseUrl}api/users/update`, userData, { responseType: 'json'})
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}api/users/profile`);
  }

  deleteUser(): Observable<any> {
    return this.http.delete(`${this.baseUrl}api/users/delete`);
  }

  getUserFavoriteBooks(userId: string): Observable<UserFavoritesResponse> {
    return this.http.get<UserFavoritesResponse>(`${this.baseUrl}api/users/${userId}/favorites`)
  }

  searchBooks(query: string): Observable<Book[]> {
    const encodedQuery = encodeURIComponent(query);
    return this.http.get<Book[]>(`${this.baseUrl}api/books/search?query=${encodedQuery}`)
  }

  searchBooksByTitle(query: string): Observable<Book[]> {
    const encodedQuery = encodeURIComponent(query);
    return this.http.get<Book[]>(`${this.baseUrl}api/books/search-by-title`, { params: { title: query } });
  }

  searchBooksByAuthor(query: string): Observable<Book[]> {
    const encodedQuery = encodeURIComponent(query);
    return this.http.get<Book[]>(`${this.baseUrl}api/books/search-by-author`, { params: { author: query } });
  }

  searchBooksByCategory(query: string): Observable<Book[]> {
    const encodedQuery = encodeURIComponent(query);
    return this.http.get<Book[]>(`${this.baseUrl}api/books/search-by-category`, { params: { category: query } });
  }

  searchBooksByIsbn(query: string): Observable<Book[]> {
    const encodedQuery = encodeURIComponent(query);
    return this.http.get<Book[]>(`${this.baseUrl}api/books/search-by-isbn`, { params: { isbn: query } });
  }

  getBookDetails(bookId: string): Observable<BookDetails> {
    return this.http.get<BookDetails>(`${this.baseUrl}api/books/${bookId}`)
  }

  addBookToFavorites(userId: string, bookId: string): Observable<any> {
    if (!userId) {
      return throwError(() => new Error("User ID not available")); 
    }

    const url = `${this.baseUrl}api/users/${userId}/favorites/${bookId}`;
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    };
    return this.http.post(url, {}, { headers: headers });
  }

  removeBookFromFavorites(userId: string, bookId: string): Observable<any> {
    if (!userId) {
      return throwError(() => new Error("User ID not available")); 
    }

    const url = `${this.baseUrl}api/users/${userId}/remove-from-favorites/${bookId}`;
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService?.getToken()}`
    };
    return this.http.delete(url, { headers: headers })
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}api/auth/refresh-token`, { refreshToken });
  }
 
}
