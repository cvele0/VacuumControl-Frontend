import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe(
        response => {
          // Handle successful login (e.g., store token in local storage, redirect, etc.)
        },
        error => {
          alert('Login failed. Please check your credentials.'); 
        }
      );
  }
}
