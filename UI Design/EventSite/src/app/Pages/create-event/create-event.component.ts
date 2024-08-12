import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Services/event.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  eventModel = {
    eventName: '',
    eventDescription: '',
    location: '',
    createdDate: '',
    endDate: '',
    categoryName: '',
    imageFile: null as File | null
  };
  categories: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private eventService: EventService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      }
    });
  }

  onFileChange(event: any) {
    this.eventModel.imageFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('EventName', this.eventModel.eventName);
    formData.append('EventDescription', this.eventModel.eventDescription);
    formData.append('Location', this.eventModel.location);
    formData.append('CreatedDate', this.eventModel.createdDate);
    formData.append('EndDate', this.eventModel.endDate);
    formData.append('CategoryName', this.eventModel.categoryName);

    if (this.eventModel.imageFile) {
      formData.append('ImageFile', this.eventModel.imageFile);
    }

    this.eventService.createEvent(formData).subscribe({
      next: (response) => {
        console.log('Event created successfully', response);
        this.router.navigate(['home']);
      },
      error: (error) => {
        console.error('Error creating event', error);
        this.errorMessage = 'An error occurred while creating the event';
      }
    });
  }
}
