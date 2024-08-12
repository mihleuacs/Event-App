import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userCount: number = 0;
  eventCount: number = 0;
  users: any[] = [];
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUserCount();
    this.fetchEventCount();
    this.fetchUsers();
  }

  fetchUserCount(): void {
    this.userService.getUserCount().subscribe({
      next: (count: number) => {
        this.userCount = count;
      },
      error: (error: any) => {
        console.error('Error fetching user count', error);
        this.errorMessage = 'An error occurred while fetching user count';
      }
    });
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: any[]) => {
        this.users = data;
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
        this.errorMessage = 'An error occurred while fetching users';
      }
    });
  }

  fetchEventCount(): void {
    this.userService.getEventCount().subscribe({
      next: (count: number) => {
        this.eventCount = count;
      },
      error: (error: any) => {
        console.error('Error fetching event count', error);
        this.errorMessage = 'An error occurred while fetching event count';
      }
    });
  }
  maskEmail(email: string): string {
    const [localPart, domain] = email.split('@');
    const maskedLocalPart = localPart.slice(0, 3) + '***';
    return `${maskedLocalPart}@${domain}`;
  }
}