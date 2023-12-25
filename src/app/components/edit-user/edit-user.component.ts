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
    this.userService.updatePermission('canCreate', this.user.canCreate);
    this.userService.updatePermission('canRead', this.user.canRead);
    this.userService.updatePermission('canUpdate', this.user.canUpdate);
    this.userService.updatePermission('canDelete', this.user.canDelete);
    this.userService.updatePermission('canSearchVacuum', this.user.canSearchVacuum);
    this.userService.updatePermission('canStartVacuum', this.user.canStartVacuum);
    this.userService.updatePermission('canStopVacuum', this.user.canStopVacuum);
    this.userService.updatePermission('canDischargeVacuum', this.user.canDischargeVacuum);
    this.userService.updatePermission('canAddVacuum', this.user.canAddVacuum);
    this.userService.updatePermission('canRemoveVacuums', this.user.canRemoveVacuums);
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
    // USER
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
    //// VACUUM
    if ((this.user.permissions & UserPermission.CAN_SEARCH_VACUUM) !== 0) {
      this.user.canSearchVacuum = true;
    } else {
      this.user.canSearchVacuum = false;
    }
    if ((this.user.permissions & UserPermission.CAN_START_VACUUM) !== 0) {
      this.user.canStartVacuum = true;
    } else {
      this.user.canStartVacuum = false;
    }
    if ((this.user.permissions & UserPermission.CAN_STOP_VACUUM) !== 0) {
      this.user.canStopVacuum = true;
    } else {
      this.user.canStopVacuum = false;
    }
    if ((this.user.permissions & UserPermission.CAN_DISCHARGE_VACUUM) !== 0) {
      this.user.canDischargeVacuum = true;
    } else {
      this.user.canDischargeVacuum = false;
    }
    if ((this.user.permissions & UserPermission.CAN_ADD_VACUUM) !== 0) {
      this.user.canAddVacuum = true;
    } else {
      this.user.canAddVacuum = false;
    }
    if ((this.user.permissions & UserPermission.CAN_REMOVE_VACUUMS) !== 0) {
      this.user.canRemoveVacuums = true;
    } else {
      this.user.canRemoveVacuums = false;
    }
  }

  setPermissionsBasedOnBoolean() : void {
    this.user.permissions = 0;
    // USER
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
    // VACUUM
    if (this.user.canSearchVacuum) {
      this.user.permissions |= UserPermission.CAN_SEARCH_VACUUM;
    }
    if (this.user.canStartVacuum) {
      this.user.permissions |= UserPermission.CAN_START_VACUUM;
    }
    if (this.user.canStopVacuum) {
      this.user.permissions |= UserPermission.CAN_STOP_VACUUM;
    }
    if (this.user.canDischargeVacuum) {
      this.user.permissions |= UserPermission.CAN_DISCHARGE_VACUUM;
    }
    if (this.user.canAddVacuum) {
      this.user.permissions |= UserPermission.CAN_ADD_VACUUM;
    }
    if (this.user.canRemoveVacuums) {
      this.user.permissions |= UserPermission.CAN_REMOVE_VACUUMS;
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
