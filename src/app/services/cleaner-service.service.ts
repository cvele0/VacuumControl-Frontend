import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cleaner } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class CleanerService {
  private apiUrl = 'http://localhost:8080/api/cleaner';

  constructor(private http: HttpClient) { }

  getCleaners(startIndex: number, endIndex: number): Observable<Cleaner[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const params = {
        startIndex: startIndex,
        endIndex: endIndex
      };
      return this.http.get<Cleaner[]>(`${this.apiUrl}/all`, { headers, params });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  getCleanerById(cleanerId: number) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` });
      return this.http.get<Cleaner>(`${this.apiUrl}?cleanerId=${cleanerId}`, { headers });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  formatDate(date: Date) : string{
    return date ? date.toISOString().split('T')[0] : ''; // Check if date exists before calling toISOString
  }

  applyAllFilters(name: string, statuses: string, dateFrom: string, dateTo: string): any {
    const token = localStorage.getItem('token');
    const params : any = {};
    

    if (name !== null && name.trim().length > 0) {
      params['name'] = name;
    }

    if (dateFrom) {
      params['dateFrom'] = dateFrom;
    }

    if (dateTo) {
        params['dateTo'] = dateTo;
    }

    if (statuses.trim().length > 0) {
      params['statuses'] = statuses;
    }

    console.log(name + " " + statuses + " " + dateFrom + " " + dateTo);

    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      return this.http.get<any>(`${this.apiUrl}/applyAllFilters`, { headers, params });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  getCleanersByNameContainingIgnoreCase(name: string) : Observable<Cleaner[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      return this.http.get<Cleaner[]>(`${this.apiUrl}/name?name=${name}`, { headers });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  getCleanersByStatusIn(statuses: string[]) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      return this.http.get<Cleaner[]>(`${this.apiUrl}/status?statuses=${statuses.join(',')}`, { headers });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  getCleanersByDateRange(dateFrom: Date, dateTo: Date): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const params = {
        dateFrom: dateFrom.toISOString(), // Convert to suitable format
        dateTo: dateTo.toISOString()     // Convert to suitable format
      };
      return this.http.get<Cleaner[]>(`${this.apiUrl}/dateRange`, { headers, params });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  createCleaner(cleaner: Cleaner): Observable<Cleaner> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` });
      return this.http.post<any>(this.apiUrl, cleaner, { headers });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  updateCleaner(updatedCleaner: any): Observable<Cleaner> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` });
      return this.http.put<Cleaner>(this.apiUrl, updatedCleaner, { headers });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  deleteCleaner(cleanerId: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` });
      return this.http.delete<any>(`${this.apiUrl}/${cleanerId}`, { headers });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  startCleaner(cleanerId: number, enteredNumber: number, email: string): Observable<string> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` });
      const params = { cleanerId: cleanerId, enteredNumber: enteredNumber, email: email };
      return this.http.get<string>(`${this.apiUrl}/start`, { headers, params });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  stopCleaner(cleanerId: number, userEmail: string): Observable<string> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` });
      const params = { cleanerId: cleanerId.toString(), userEmail };
      return this.http.get<string>(`${this.apiUrl}/stop`, { headers, params });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  dischargeCleaner(cleanerId: number, userEmail: string): Observable<string> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` });
      const params = { cleanerId: cleanerId.toString(), userEmail };
      return this.http.get<string>(`${this.apiUrl}/discharge`, { headers, params });
    } else {
      throw new Error('Token not found in localStorage');
    }
  }
}
