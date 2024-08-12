import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { EventService } from 'src/app/Services/event.service';
import { OnInit } from '@angular/core';
import { EventPost } from 'src/app/Models/EventPost.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent {
  @Input() event!: EventPost;
  @Output() close = new EventEmitter<void>();

  closePopup(): void {
    this.close.emit();
}
}