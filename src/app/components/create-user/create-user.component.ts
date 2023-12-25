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

    canSearchVacuum: false,
    canStartVacuum: false,
    canStopVacuum: false,
    canDischargeVacuum: false,
    canAddVacuum: false,
    canRemoveVacuums: false
  };
  
  constructor(private userService: UserService, private router: Router, private http: HttpClient) {}

  createUser(): void {
    let permissions: number = 0;
    //USER
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
    // VACUUM
    if (this.newUser.canSearchVacuum) {
      permissions |= UserPermission.CAN_SEARCH_VACUUM;
    }
    if (this.newUser.canStartVacuum) {
      permissions |= UserPermission.CAN_START_VACUUM;
    }
    if (this.newUser.canStopVacuum) {
      permissions |= UserPermission.CAN_STOP_VACUUM;
    }
    if (this.newUser.canDischargeVacuum) {
      permissions |= UserPermission.CAN_DISCHARGE_VACUUM;
    }
    if (this.newUser.canAddVacuum) {
      permissions |= UserPermission.CAN_ADD_VACUUM;
    }
    if (this.newUser.canRemoveVacuums) {
      permissions |= UserPermission.CAN_REMOVE_VACUUMS;
    }
    const u = new User(0, this.newUser.name, this.newUser.surname, this.newUser.password, this.newUser.email, permissions);
    this.userService.createUser(u)
      .subscribe(
        (response) => {
          console.log('User created:', response);
          this.router.navigate(["user-list"]);
        },
        (error) => {
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
