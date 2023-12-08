import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const token = localStorage.getItem('token'); // Fetch the token from localStorage
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.http.get<any[]>('http://localhost:8080/api/users/all', { headers })
        .subscribe(
          (data) => {
            this.users = data;
          },
          (error) => {
            console.error('Error fetching users:', error);
          }
        );
    } else {
      console.error('Token not found in localStorage');
    }
  }

  editUser(userId: number): void {
    this.router.navigate(['/edit-user', userId]);
  }
}
