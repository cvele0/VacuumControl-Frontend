import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserPermission } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: any = null;

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  private canCreate = false;
  private canRead = false;
  private canUpdate = false;
  private canDelete = false;

  canCreate$ = new BehaviorSubject<boolean>(this.canCreate);
  canRead$ = new BehaviorSubject<boolean>(this.canRead);
  canUpdate$ = new BehaviorSubject<boolean>(this.canUpdate);
  canDelete$ = new BehaviorSubject<boolean>(this.canDelete);

  updatePermission(permission: string, value: boolean): void {
    // console.log("pozvan sam " + this.canDelete + " " + value);
    switch (permission) {
      case 'canCreate':
        this.canCreate = value;
        this.canCreate$.next(this.canCreate);
        break;
      case 'canRead':
        this.canRead = value;
        this.canRead$.next(this.canRead);
        break;
      case 'canUpdate':
        this.canUpdate = value;
        this.canUpdate$.next(this.canUpdate);
        break;
      case 'canDelete':
        this.canDelete = value;
        this.canDelete$.next(this.canDelete);
        break;
      default:
        break;
    }
  }

  setCurrentUser(email: any, permissions: number): void {
    this.currentUser = email;
    this.canCreate = ((permissions & UserPermission.CAN_CREATE_USERS) !== 0);
    this.canUpdate = ((permissions & UserPermission.CAN_UPDATE_USERS) !== 0);
    this.canRead = ((permissions & UserPermission.CAN_READ_USERS) !== 0);
    this.canDelete = ((permissions & UserPermission.CAN_DELETE_USERS) !== 0);
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

  getUserById(userId: number) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` });
      return this.http.get<User>(`${this.apiUrl}?userId=${userId}`, { headers });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  updateUser(updatedUser: any): Observable<User> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` });
      return this.http.put<User>(this.apiUrl, updatedUser, { headers });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }

  ///////////////////////////// PERMISSION METHODS


  userHasPermissionToReadUsers() : boolean {
    // return (this.currentPermissions & UserPermission.CAN_READ_USERS) !== 0;
    return this.canRead;
  }

  userHasPermissionToCreateUsers() : boolean {
    // return (this.currentPermissions & UserPermission.CAN_CREATE_USERS) !== 0;
    return this.canCreate;
  }

  userHasPermissionToUpdateUsers() : boolean {
    // return (this.currentPermissions & UserPermission.CAN_UPDATE_USERS) !== 0;
    return this.canUpdate;
  }

  userHasPermissionToDeleteUsers() : boolean {
    // return (this.currentPermissions & UserPermission.CAN_DELETE_USERS) !== 0;
    return this.canDelete;
  }
}
