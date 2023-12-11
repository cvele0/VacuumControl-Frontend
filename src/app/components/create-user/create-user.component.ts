import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserPermission } from 'src/app/model/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  newUser = {
    name: '',
    surname: '',
    email: '',
    password: '',
    canCreate: false,
    canRead: false,
    canUpdate: false,
    canDelete: false,
  };
  
  constructor(private userService: UserService, private router: Router, private http: HttpClient) {}

  createUser(): void {
    let permissions: number = 0;
    if (this.newUser.canRead) {
      permissions |= UserPermission.CAN_READ_USERS;
    }
    if (this.newUser.canCreate) {
      permissions |= UserPermission.CAN_CREATE_USERS;
    }
    if (this.newUser.canUpdate) {
      permissions |= UserPermission.CAN_UPDATE_USERS;
    }
    if (this.newUser.canDelete) {
      permissions |= UserPermission.CAN_DELETE_USERS;
    }
    const u = new User(0, this.newUser.name, this.newUser.surname, this.newUser.password, this.newUser.email, permissions);
    this.userService.createUser(u)
      .subscribe(
        (response) => {
          // Handle successful creation
          console.log('User created:', response);
          this.router.navigate(["user-list"]);
        },
        (error) => {
          // Handle errors
          console.error('Error creating user:', error);
        }
      );
  }

  ngOnInit(): void {
    if (!this.userService.userHasPermissionToCreateUsers()) {
      alert('User does not have permission to create users');
      const currentUrl = this.router.url; // Get the current URL
      this.router.navigate([currentUrl]); // Navigate to the current URL
      return;
    }
  }

  onSubmit() {
    this.createUser();
  }
}
