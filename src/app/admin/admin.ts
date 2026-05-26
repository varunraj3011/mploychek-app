import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { UserService } from '../services/user';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  users: any[] = [];
  newUser = { userid: '', password: '', role: 'General User' };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public router: Router,
    private cd: ChangeDetectorRef
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers()
      .subscribe({
        next: (data) => {
          this.users = data;
          this.cd.detectChanges();
        }
      });
  }

  addUser(): void {
    this.userService.addUser(this.newUser)
      .subscribe({
        next: (user) => {
          this.users.push(user);
          this.newUser = { userid: '', password: '', role: 'General User' };
          this.cd.detectChanges();
        }
      });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id)
      .subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
          this.cd.detectChanges();
        }
      });
  }
}