import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { UserService } from '../services/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  user: any = null;
  records: any[] = [];
  isLoadingRecords: boolean = false;

  constructor(
    private authService: AuthService,
    public router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoadingRecords = true;

    this.userService.getRecords(this.user.userid, this.user.role)
      .subscribe({
        next: (data) => {
          this.records = data;
          this.isLoadingRecords = false;
          this.cd.detectChanges();
        },
        error: () => {
          this.isLoadingRecords = false;
          this.cd.detectChanges();
        }
      });
  }
}