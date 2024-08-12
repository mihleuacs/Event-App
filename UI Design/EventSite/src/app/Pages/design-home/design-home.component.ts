import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { EventPost } from 'src/app/Models/EventPost.model';
import { EventService } from 'src/app/Services/event.service';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-design-home',
  templateUrl: './design-home.component.html',
  styleUrls: ['./design-home.component.css']
})
export class DesignHomeComponent implements OnInit, OnDestroy {
  events: EventPost[] = [];
  visibleEvents: EventPost[] = [];
  private imageIndex: number = 0;
  private intervalId: any;
  private currentPage: number = 0;
  private pageSize: number = 3;
  images: string[] = [
    'assets/Images/austin-distel-rxpThOwuVgE-unsplash.jpg',
    'assets/Images/edwin-andrade-6liebVeAfrY-unsplash.jpg',
    'assets/Images/jnr-jose-I8Rf3tItuHE-unsplash.jpg',
    'assets/Images/manel-sean-U-1LOooJXVc-unsplash.jpg'
  ];


  isLoggedIn: boolean = false;

  constructor(
    private eventService: EventService,
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
    this.startImageRotation();
    this.checkLoginStatus(); 
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (data: EventPost[]) => {
        const currentDate = new Date();
        this.events = data.filter(event => new Date(event.createdDate) >= currentDate);
        this.updateVisibleEvents();
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  startImageRotation(): void {
    this.intervalId = setInterval(() => {
      this.imageIndex = (this.imageIndex + 1) % this.images.length;
    }, 5000); 
  }

  get currentImage(): string {
    return this.images[this.imageIndex];
  }

  updateVisibleEvents(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.visibleEvents = this.events.slice(start, end);
  }

  next(): void {
    if ((this.currentPage + 1) * this.pageSize < this.events.length) {
      this.currentPage++;
      this.updateVisibleEvents();
    }
  }

  prev(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateVisibleEvents();
    }
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout(); 
    this.isLoggedIn = false; 
    this.router.navigate(['/']); 
  }
}