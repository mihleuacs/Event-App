import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { EventService } from 'src/app/Services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventModel = {
    id: '',
    eventName: '',
    eventDescription: '',
    location: '',
    createdDate: '',
    endDate: '',
    categoryName: '',
    imageFile: null as File | null,
    imageUrl: ''
  };
  categories: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.loadEvent();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error: any) => {
        console.error('Error fetching categories', error);
      }
    });
  }

  loadEvent(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe({
        next: (data: any) => {
          this.eventModel = { ...data, imageFile: null };
          this.eventModel.createdDate = new Date(this.eventModel.createdDate).toISOString().slice(0, 16);
          this.eventModel.endDate = new Date(this.eventModel.endDate).toISOString().slice(0, 16);

          this.eventModel.createdDate = this.eventModel.createdDate.replace('T', ' ');
          this.eventModel.endDate = this.eventModel.endDate.replace('T', ' ');
        },
        error: (error: any) => {
          console.error('Error loading event', error);
          this.errorMessage = 'An error occurred while loading the event';
        }
      });
    }
  }

  onFileChange(event: any) {
    this.eventModel.imageFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('Id', this.eventModel.id);
    formData.append('EventName', this.eventModel.eventName || '');
    formData.append('EventDescription', this.eventModel.eventDescription || '');
    formData.append('Location', this.eventModel.location || '');
    formData.append('CreatedDate', this.eventModel.createdDate);
    formData.append('EndDate', this.eventModel.endDate);
    formData.append('ProductImage', this.eventModel.imageUrl || '');

    if (this.eventModel.imageFile) {
      formData.append('ImageFile', this.eventModel.imageFile);
    }

    this.eventService.updateEvent(formData).subscribe({
      next: (response: any) => {
        console.log('Event updated successfully', response);
        this.router.navigate(['home']);
      },
      error: (error: any) => {
        console.error('Error updating event', error);
        this.errorMessage = 'An error occurred while updating the event';
      }
    });
  }
}
