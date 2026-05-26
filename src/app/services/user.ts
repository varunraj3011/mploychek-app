import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRecords(userid: string, role: string, delay: number = 2000): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/records?userid=${userid}&role=${role}&delay=${delay}`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/users`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/users`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/users/${id}`);
  }

}