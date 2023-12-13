import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { User, UserPermission } from 'src/app/model/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers()
      .pipe(
        catchError((error) => {
          console.error('Error fetching users:', error);
          return throwError('There was an error fetching users');
        })
      )
      .subscribe(
        (data) => {
          if (this.userService.userHasPermissionToReadUsers()) {
            this.users = data;
          } else {
            console.log('User does not have permission to view users');
            throw new Error('Forbidden'); 
          }
        },
        (error) => {
          if (error.message === 'Forbidden') {
            // Handle the 403 error here
            console.error('User does not have permission to view users');
            // Return or handle the 403 error accordingly
          } else {
            console.error('Error fetching users:', error);
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

  deleteUser(userid: number): void {

  }

  getUserPermissions(permissions: number): string[] {
    const permissionTitles: string[] = [];
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
    return permissionTitles;
  }
}
