import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorMessage, User, UserPermission } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserEmail: string = '';

  private apiUrl = 'http://localhost:8080/api/users';
  private errorApiUrl = 'http://localhost:8080/api/errorMessages';

  constructor(private http: HttpClient) {}

  private canCreate = false;
  private canRead = false;
  private canUpdate = false;
  private canDelete = false;

  private canSearchVacuum = false;
  private canStartVacuum = false;
  private canStopVacuum = false;
  private canDischargeVacuum = false;
  private canAddVacuum = false;
  private canRemoveVacuums = false;

  canCreate$ = new BehaviorSubject<boolean>(this.canCreate);
  canRead$ = new BehaviorSubject<boolean>(this.canRead);
  canUpdate$ = new BehaviorSubject<boolean>(this.canUpdate);
  canDelete$ = new BehaviorSubject<boolean>(this.canDelete);

  canSearchVacuum$ = new BehaviorSubject<boolean>(this.canSearchVacuum);
  canStartVacuum$ = new BehaviorSubject<boolean>(this.canStartVacuum);
  canStopVacuum$ = new BehaviorSubject<boolean>(this.canStopVacuum);
  canDischargeVacuum$ = new BehaviorSubject<boolean>(this.canDischargeVacuum);
  canAddVacuum$ = new BehaviorSubject<boolean>(this.canAddVacuum);
  canRemoveVacuums$ = new BehaviorSubject<boolean>(this.canRemoveVacuums);

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
        ///////// VACUUM
      case 'canSearchVacuum':
        this.canSearchVacuum = value;
        this.canSearchVacuum$.next(this.canSearchVacuum);
        break;
      case 'canStartVacuum':
        this.canStartVacuum = value;
        this.canStartVacuum$.next(this.canStartVacuum);
        break;
      case 'canStopVacuum':
        this.canStopVacuum = value;
        this.canStopVacuum$.next(this.canStopVacuum);
        break;
      case 'canDischargeVacuum':
        this.canDischargeVacuum = value;
        this.canDischargeVacuum$.next(this.canDischargeVacuum);
        break;
      case 'canAddVacuum':
        this.canAddVacuum = value;
        this.canAddVacuum$.next(this.canAddVacuum);
        break;
      case 'canRemoveVacuums':
        this.canRemoveVacuums = value;
        this.canRemoveVacuums$.next(this.canRemoveVacuums);
        break;
      default:
        break;
    }
  }

  getCurrentEmail() : string {
    return this.currentUserEmail;
  }

  logoutCurrentUser(): void {
    this.currentUserEmail = '';
    this.canCreate = this.canRead = this.canUpdate = this.canDelete = false;
    this.canSearchVacuum = this.canStartVacuum = this.canStopVacuum = false;
    this.canDischargeVacuum = this.canAddVacuum = this.canRemoveVacuums = false;
  }

  setCurrentUser(email: string, permissions: number): void {
    this.currentUserEmail = email;
    this.canCreate = ((permissions & UserPermission.CAN_CREATE_USERS) !== 0);
    this.canUpdate = ((permissions & UserPermission.CAN_UPDATE_USERS) !== 0);
    this.canRead = ((permissions & UserPermission.CAN_READ_USERS) !== 0);
    this.canDelete = ((permissions & UserPermission.CAN_DELETE_USERS) !== 0);
    
    this.canSearchVacuum = ((permissions & UserPermission.CAN_SEARCH_VACUUM) !== 0);
    this.canStartVacuum = ((permissions & UserPermission.CAN_START_VACUUM) !== 0);
    this.canStopVacuum = ((permissions & UserPermission.CAN_STOP_VACUUM) !== 0);
    this.canDischargeVacuum = ((permissions & UserPermission.CAN_DISCHARGE_VACUUM) !== 0);
    this.canAddVacuum = ((permissions & UserPermission.CAN_ADD_VACUUM) !== 0);
    this.canRemoveVacuums = ((permissions & UserPermission.CAN_REMOVE_VACUUMS) !== 0);
  }

  /////////////////////////////// USER METHODS

  getErrorMessages(): Observable<ErrorMessage[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      return this.http.get<ErrorMessage[]>(`${this.errorApiUrl}/all`, { headers });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

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

  createErrorMessage(errorMessage: ErrorMessage): Observable<ErrorMessage> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` });
      return this.http.post<ErrorMessage>(this.errorApiUrl, errorMessage, { headers });
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
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` });
      return this.http.delete<any>(`${this.apiUrl}/${userId}`, { headers });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  ///////////////////////////// USER PERMISSION METHODS

  userHasPermissionToReadUsers() : boolean {
    return this.canRead;
  }

  userHasPermissionToCreateUsers() : boolean {
    return this.canCreate;
  }

  userHasPermissionToUpdateUsers() : boolean {
    return this.canUpdate;
  }

  userHasPermissionToDeleteUsers() : boolean {
    return this.canDelete;
  }

  ///////////////////////////// VACUUM PERMISSION METHODS
  userHasPermissionToSearchVacuum() : boolean {
    return this.canSearchVacuum;
  }

  userHasPermissionToStartVacuum() : boolean {
    return this.canStartVacuum;
  }

  userHasPermissionToStopVacuum() : boolean {
    return this.canStopVacuum;
  }

  userHasPermissionToDischargeVacuum() : boolean {
    return this.canDischargeVacuum;
  }

  userHasPermissionToAddVacuum() : boolean {
    return this.canAddVacuum;
  }

  userHasPermissionToRemoveVacuums() : boolean {
    return this.canRemoveVacuums;
  }
}
