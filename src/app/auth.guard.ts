import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const isLoginPage = route.routeConfig?.path === 'login';
  const isLoggedIn = authService.isLoggedIn();

  if (isLoggedIn && isLoginPage) {
    // If logged-in user is trying to navigate to /login, redirect to /main
    router.navigate(['/main']);
    return false;
  } else if (!isLoggedIn && !isLoginPage) {
    // If not logged-in user is trying to navigate to /main, redirect to /login
    router.navigate(['/login']);
    return false;
  }

  // Otherwise, allow the navigation
    return true;
};
