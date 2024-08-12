import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;
 
  username: string | null = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAuthStatus();
      }
    });
  }

  ngOnInit() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    const username = localStorage.getItem('username');
    this.isAuthenticated = !!username;
    this.isAdmin = username === 'Admin@gmail.com';
    this.username = username;
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    this.isAdmin = false;
    this.isAuthenticated = false;
   
    this.router.navigate(['/login']); 
  }

  
}