import { Component } from '@angular/core';
import { EventService } from 'src/app/Services/event.service';
import { Router } from '@angular/router';
import { EventPost } from 'src/app/Models/EventPost.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  events: any[] = [];
  errorMessage: string | null = null;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMyEvents();
  }

  fetchMyEvents() {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        console.error('Error fetching events', error);
        this.errorMessage = 'An error occurred while fetching events';
      }
    });
  }
  editEvent(eventId: number) {
    this.router.navigate([`/edit-event/${eventId}`]);
  }

  deleteEvent(eventId: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          this.fetchMyEvents();
           // Refresh the event list
        },
        error: (error) => {
          console.error('Error deleting event', error);
          this.errorMessage = 'An error occurred while deleting the event';
        }
      });
    }
    window.location.reload();
  }
}