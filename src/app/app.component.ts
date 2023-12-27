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

  addVacuumPermission(): boolean {
    return this.userService.userHasPermissionToAddVacuum();
  }

  searchVacuumPermission() : boolean {
    return this.userService.userHasPermissionToSearchVacuum();
  }

  getCurrentUser(): string {
    return this.userService.getCurrentEmail();
  }

  isLoggedIn(): boolean {
    return (this.userService.getCurrentEmail() !== '');
  }
}
