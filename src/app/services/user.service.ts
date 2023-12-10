import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserPermission } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: any = null;
  private currentPermissions: number = 0;

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  setCurrentUser(email: any, permissions: number): void {
    this.currentUser = email;
    this.currentPermissions = permissions;
  }

  getCurrentPermissions(): number {
    return this.currentPermissions;
  }

  /////////////////////////////// USER METHODS

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      return this.http.get<User[]>(`${this.apiUrl}/all`, { headers });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  createUser(user: User): Observable<User> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` });
      return this.http.post<User>(this.apiUrl, user, { headers });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  // updateUser(updatedUser: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/users/${updatedUser.id}`, updatedUser);
  // }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }

  ///////////////////////////// PERMISSION METHODS


  userHasPermissionToReadUsers() : boolean {
    return (this.currentPermissions & UserPermission.CAN_READ_USERS) !== 0;
  }

  userHasPermissionToCreateUsers() : boolean {
    return (this.currentPermissions & UserPermission.CAN_CREATE_USERS) !== 0;
  }

  userHasPermissionToUpdateUsers() : boolean {
    return (this.currentPermissions & UserPermission.CAN_UPDATE_USERS) !== 0;
  }

  userHasPermissionToDeleteUsers() : boolean {
    return (this.currentPermissions & UserPermission.CAN_DELETE_USERS) !== 0;
  }
}
