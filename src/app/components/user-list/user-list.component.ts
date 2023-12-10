import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserPermission } from 'src/app/model/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    try {
      this.userService.getUsers().subscribe(
        (data) => {
          if (this.userService.userHasPermissionToReadUsers()) {
            this.users = data;
          } else {
            console.log('User does not have permission to view users');
            // alert('User does not have permission to view users');
          }
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    } catch (error: any) {
      console.error(error.message);
    }
  }

  editUser(userId: number): void {
    this.router.navigate(['/edit-user', userId]);
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
    // Add other permissions based on bitwise operations (e.g., permissions & 4, permissions & 8, etc.)
    return permissionTitles;
  }
}
