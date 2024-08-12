import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginResponse } from '../Models/login-response';
import { LoginModel } from '../Models/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7205'; // Adjust based on your API endpoint
  

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user)
      .pipe(
        tap(response => {
          
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('username', user.username); // Store username
        })
      );
  }
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}