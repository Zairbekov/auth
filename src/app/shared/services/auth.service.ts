import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.interface';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) {}

  get token(): string {
    const tokenTime = new Date(localStorage.getItem('expires_at')); 
    if (new Date > tokenTime){
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  login(user: User): Observable<any> {
    return this.http.post(`https://core.nekta.cloud/api/auth/login`, user)
    .pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    )
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse){
    const message = error.error.error.data.msg;
    this.error$.next(message);
    return throwError(error);
  }

  private setToken(response: AuthResponse | null) {
    
    if (response){
      alert(response.msg)
    const expDate = new Date(new Date().getTime() + response.data.expires_at * 1000)
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('expires_at', expDate.toString());
    localStorage.setItem('token_type', response.data.token_type);
    } else {
      localStorage.clear();
    }
    
  }
}
