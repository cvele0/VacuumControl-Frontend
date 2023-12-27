import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCleanerGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const storedToken = localStorage.getItem('token');
    if (storedToken == null || storedToken.length == 0) {
      this.router.navigate(['login-page']);
      return false;
    }
    if (!this.userService.userHasPermissionToAddVacuum()) {
      alert('User does not have permission to add vacuum');
      // this.router.navigate(['']); // Redirect to a specific route upon lacking permissions
      return false; // Prevent navigation
    }
    return true; // Allow navigation
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
