import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NgForm } from '@angular/forms';
import { LoginResponse } from 'src/app/Models/login-response';
import { LoginModel } from 'src/app/Models/LoginModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel = {
    username: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.loginModel)
      .subscribe(response => {
        console.log('Login successful', response);
        const accessToken = response.accessToken;
        const username = this.loginModel.username;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('username', username);

        // Admin check
        if (username === 'Admin@gmail.com' && this.loginModel.password === 'Admin.123') {
          
          this.router.navigate(['/admin']); 
         
        } else {
          
          this.router.navigate(['/home']); 
         
        }
      }, error => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid username or password';
      });
  }
}