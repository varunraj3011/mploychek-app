import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginData = { userid: '', password: '', role: '' };
  isLoading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.post<any>('http://localhost:3000/api/login', this.loginData)
      .subscribe({
        next: (user) => {
          this.isLoading = false;
          this.authService.setUser(user);
          this.router.navigate(['/dashboard']);
          this.cd.detectChanges();
          
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Invalid credentials. Please try again.';
          this.cd.detectChanges();
        }
      });
  }
}