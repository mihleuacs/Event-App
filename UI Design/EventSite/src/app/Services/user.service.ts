import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7205';

  constructor(private http: HttpClient) {}

  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/count`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
  getEventCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/events/count`);
  }
}
