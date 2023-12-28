import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { User, UserPermission } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient, private router: Router, private userService: UserService,
    private authService: AuthService) { }
 
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    if (this.userService.getCurrentEmail() === '') {
      alert("User logged out");
      this.router.navigate(['login-page']);
      return;
    }
    this.userService.getUsers()
      .pipe(
        catchError((error) => {
          console.error('Error fetching users:', error);
          this.router.navigate(['login-page']);
          return throwError('There was an error fetching users');
        })
      )
      .subscribe(
        (data) => {
          if (this.userService.userHasPermissionToReadUsers()) {
            this.users = data;
          } else {
            console.log('User does not have permission to view users');
            this.router.navigate(['login-page']);
            throw new Error('Forbidden'); 
          }
        },
        (error) => {
          if (error.message === 'Forbidden') {
            // Handle the 403 error here
            console.error('User does not have permission to view users');
            this.router.navigate(['login-page']);
            // Return or handle the 403 error accordingly
          } else {
            console.error('Error fetching users:', error);
            this.router.navigate(['login-page']);
            // Handle other errors as needed
          }
        }
      );
  }

  deletePermission(): boolean {
    return this.userService.userHasPermissionToDeleteUsers();
  }

  updatePermission() : boolean {
    return this.userService.userHasPermissionToUpdateUsers();
  }

  editUser(userId: number): void {
    if (!this.updatePermission()) {
      alert("User has no permission to update users.");
      return;
    }
    this.router.navigate(['/edit-user', userId]);
  }

  deleteUser(email: string, userId: number): void {
    const confirmDelete = confirm(`Are you sure you want to delete the user with email ${email}?`);
    if (confirmDelete) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          if (this.userService.getCurrentEmail() === email) {
            console.log("brise se ulogovan");
            this.userService.logoutCurrentUser();
            this.authService.logout();
            this.router.navigate(['login-page']);
          } else {
            console.log(`User with email ${email} deleted successfully.`);
            this.router.navigate(['user-list']);
          }
        },
        (error) => {
          console.error('Error deleting user:', error);
          this.router.navigate(['login-page']);
        }
      );
    }
  }

  getUserPermissions(permissions: number): string[] {
    const permissionTitles: string[] = [];
    // USER
    if (permissions & UserPermission.CAN_CREATE_USERS) {
      permissionTitles.push('CREATE');
    }
    if (permissions & UserPermission.CAN_READ_USERS) {
      permissionTitles.push('READ');
    }
    if (permissions & UserPermission.CAN_UPDATE_USERS) {
      permissionTitles.push('UPDATE');
    }
    if (permissions & UserPermission.CAN_DELETE_USERS) {
      permissionTitles.push('DELETE');
    } 
    // VACUUM
    if (permissions & UserPermission.CAN_SEARCH_VACUUM) {
      permissionTitles.push('SEARCH VACUUM');
    } 
    if (permissions & UserPermission.CAN_START_VACUUM) {
      permissionTitles.push('START VACUUM');
    } 
    if (permissions & UserPermission.CAN_STOP_VACUUM) {
      permissionTitles.push('STOP VACUUM');
    } 
    if (permissions & UserPermission.CAN_DISCHARGE_VACUUM) {
      permissionTitles.push('DISCHARGE VACUUM');
    } 
    if (permissions & UserPermission.CAN_ADD_VACUUM) {
      permissionTitles.push('ADD VACUUM');
    } 
    if (permissions & UserPermission.CAN_REMOVE_VACUUMS) {
      permissionTitles.push('REMOVE VACUUMS');
    } 
    return permissionTitles;
  }
}
