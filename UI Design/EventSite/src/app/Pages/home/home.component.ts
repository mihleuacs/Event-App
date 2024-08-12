import { Component } from '@angular/core';
import { EventPost } from 'src/app/Models/EventPost.model';
import { EventService } from 'src/app/Services/event.service';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/Models/Category';
import { parse, format, isValid } from 'date-fns';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  events: EventPost[] = [];
  filteredEvents: EventPost[] = [];
  selectedCategory: number | null = null;
  searchTerm: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  formattedStartDate: string = '';
  formattedEndDate: string = '';
  showPopup: boolean = false;
  selectedEvent: EventPost | null = null;

  constructor(private eventPostService: EventService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadEvents();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  loadEvents(): void {
    this.eventPostService.getEvents().subscribe((events: EventPost[]) => {
      this.events = events;
      this.filteredEvents = events;
    });
  }

  onSearch(): void {
    this.filterEvents();
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = +target.value || null;
    this.filterEvents();
  }

  onStartDateChange(dateString: string): void {
    this.startDate = this.parseDate(dateString);
    this.formattedStartDate = dateString;
    this.filterByDate(); 
  }

  onEndDateChange(dateString: string): void {
    this.endDate = this.parseDate(dateString);
    this.formattedEndDate = dateString;
    this.filterByDate(); 
  }

  parseDate(dateString: string): Date | null {
    const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
    return isValid(parsedDate) ? parsedDate : null;
  }

  filterByDate(): void {
    this.filterEvents();
  }

  filterEvents(): void {
    this.filteredEvents = this.events.filter(event => {
      const matchesCategory = this.selectedCategory ? event.categoryId === this.selectedCategory : true;
      const matchesSearch = event.eventName.toLowerCase().includes(this.searchTerm.toLowerCase());

      const eventCreatedDate = new Date(event.createdDate);
      const eventEndDate = new Date(event.endDate);

      const matchesStartDate = this.startDate ? eventCreatedDate >= this.startDate : true;
      const matchesEndDate = this.endDate ? eventEndDate <= this.endDate : true;

      return matchesCategory && matchesSearch && matchesStartDate && matchesEndDate;
    });
  }

  onEventClick(event: EventPost): void {
    this.selectedEvent = event;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken'); 
  }
}