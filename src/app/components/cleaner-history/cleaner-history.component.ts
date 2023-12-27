import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cleaner-history',
  templateUrl: './cleaner-history.component.html',
  styleUrls: ['./cleaner-history.component.css']
})
export class CleanerHistoryComponent {
  errorHistory: any[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.fetchErrorHistory();
  }

  fetchErrorHistory(): void {
    if (this.userService.getCurrentEmail() === '') {
      this.router.navigate(['login-page']);
      return;
    }
    // Assuming getErrorHistory() returns an observable of error history
    this.userService.getErrorMessages().subscribe(
      (data: any[]) => {
        this.errorHistory = data;
      },
      (error) => {
        console.error('Error occurred while fetching error history:', error);
        // Handle error if needed (e.g., show error message)
      }
    );
  }
}
