import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventPost } from '../Models/EventPost.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://localhost:7205/api/eventpost'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventPost[]> {
    return this.http.get<EventPost[]>(this.apiUrl);
  }

  createEvent(eventData: FormData): Observable<EventPost> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    return this.http.post<EventPost>(this.apiUrl, eventData, { headers });
  }
  deleteEvent(eventId: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`, { headers });
    
  }

  updateEvent(eventData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    const id = eventData.get('Id') as string;

    return this.http.put(`${this.apiUrl}/${id}`, eventData, { headers });
  }

  getEventById(id: string): Observable<EventPost> {
    return this.http.get<EventPost>(`${this.apiUrl}/${id}`);
  }
}
