import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private readonly AUTH_KEY = 'isAuthenticated'; 

  constructor(private http: HttpClient) {
    this.isAuthenticated = localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  private _isAuthenticated: boolean = false;

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
    localStorage.setItem(this.AUTH_KEY, value.toString()); 
  }

  setLogin() {
    this.isAuthenticated = true; 
  }

  logout() {
    this.isAuthenticated = false; 
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
