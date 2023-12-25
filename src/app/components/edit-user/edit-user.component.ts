import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPermission } from 'src/app/model/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  userId: number = 0;
  user: any = {};

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  onSubmit(): void {
    if (!this.user || !this.user.password || this.user.password.length === 0) {
      alert("Password is required.");
      return;
    }
    this.setPermissionsBasedOnBoolean();
    this.user.hashedPassword = this.user.password;
    // this.userService.updatePermission('canDelete', this.user.canDelete);
    // console.log("updating: " + this.user.userId + " " + this.user.hashedPassword + " " + this.user.email);

    this.userService.updateUser(this.user).subscribe(
      (response: any) => {
        console.log('User updated:', response);
      },
      (error: any) => {
        console.error('Error updating user:', error);
      }
    );
    alert("User updated.");
  }

  setPermissions() : void {
    if ((this.user.permissions & UserPermission.CAN_CREATE_USERS) !== 0) {
      this.user.canCreate = true;
    } else {
      this.user.canCreate = false;
    }
    if ((this.user.permissions & UserPermission.CAN_READ_USERS) !== 0) {
      this.user.canRead = true;
    } else {
      this.user.canRead = false;
    }
    if ((this.user.permissions & UserPermission.CAN_UPDATE_USERS) !== 0) {
      this.user.canUpdate = true;
    } else {
      this.user.canUpdate = false;
    } 
    if ((this.user.permissions & UserPermission.CAN_DELETE_USERS) !== 0) {
      this.user.canDelete = true;
    } else {
      this.user.canDelete = false;
    }
  }

  setPermissionsBasedOnBoolean() : void {
    this.user.permissions = 0;
    if (this.user.canCreate) {
      this.user.permissions |= UserPermission.CAN_CREATE_USERS;
    }
    if (this.user.canUpdate) {
      this.user.permissions |= UserPermission.CAN_UPDATE_USERS;
    }
    if (this.user.canRead) {
      this.user.permissions |= UserPermission.CAN_READ_USERS;
    }
    if (this.user.canDelete) {
      this.user.permissions |= UserPermission.CAN_DELETE_USERS;
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id']; // Fetch user ID from URL parameter
      this.userService.getUserById(userId).subscribe(
          (data: any) => {
            this.user = data; // Set fetched user data to user object
            this.setPermissions();
          },
          (error: any) => {
            console.error('Error fetching user:', error);
          }
        );
    });
  }
}
