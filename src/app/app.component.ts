import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'domaci3-frontend';

  constructor(private userService: UserService) {}

  createPermission(): boolean {
    return this.userService.userHasPermissionToCreateUsers();
  }

  getCurrentUser(): string {
    return this.userService.getCurrentEmail();
  }
}
