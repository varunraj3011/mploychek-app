import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

}