import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerModel = {
    name: '',
    email: '',
    password: ''
  };
  strength: 'weak' | 'medium' | 'strong' = 'weak';
  strengthBarWidth: string = '0%';
  constructor(private http: HttpClient, private router: Router) {}

  checkPasswordStrength() {
    const password = this.registerModel.password;
    const lengthCriteria = /(?=.{8,})/; // At least 8 characters
    const symbolCriteria = /(?=.*[!@#$%^&*])/; // At least one symbol

    if (lengthCriteria.test(password)) {
      if (symbolCriteria.test(password)) {
        this.strength = 'strong';
        this.strengthBarWidth = '100%';
      } else {
        this.strength = 'medium';
        this.strengthBarWidth = '50%';
      }
    } else {
      this.strength = 'weak';
      this.strengthBarWidth = '25%';
    }
  }

  onSubmit() {
    if (this.strength === 'weak') {
      alert('Password is too weak. Please choose a stronger password.');
      return;
    }
    this.http.post('https://localhost:7205/register', this.registerModel)
      .subscribe({
        next: (response: any) => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          alert('Registration failed! Please try again.');
        }
      });
  }
}