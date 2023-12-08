import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.authService.setLogin();
          this.router.navigate(['/user-list']);
        },
        error => {
          alert('Login failed. Please check your credentials.'); 
        }
      );
  }
}
