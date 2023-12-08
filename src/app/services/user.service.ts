import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'your_backend_api_url';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  addUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, newUser);
  }

  updateUser(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${updatedUser.id}`, updatedUser);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }
}
