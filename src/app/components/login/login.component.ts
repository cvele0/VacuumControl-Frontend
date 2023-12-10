import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import jwt_decode from 'jwt-decode';
// import * as jwt_decode from "jwt-decode";
import { jwtDecode } from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private  userService: UserService) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe(
        response => {
          localStorage.setItem('token', response.jwt);
          const decodedToken: any = jwtDecode(response.jwt);
          // console.log(decodedToken.sub + " iii " + decodedToken.permissions);
          this.userService.setCurrentUser(decodedToken.sub, decodedToken.permissions);
          this.authService.setLogin();
          this.router.navigate(['/user-list']);
          // console.log("token: " + JSON.stringify(response));
          alert("Login successful.");
        },
        error => {
          alert('Login failed. Please check your credentials.'); 
        }
      );
  }
}
