import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListUsersGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const storedToken = localStorage.getItem('token');
    if (storedToken == null || storedToken.length == 0) {
      this.router.navigate(['login-page']);
      return false;
    }
    if (!this.userService.userHasPermissionToReadUsers()) {
      alert('User does not have permission to read users');
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
