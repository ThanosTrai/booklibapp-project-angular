import { Routes } from '@angular/router';
import { LoginComponent } from './login-form/login-form.component';
import { MainComponent } from './main/main.component';
import { authGuard } from './auth.guard';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { UserLibraryComponent } from './user-library/user-library.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, canActivate: [authGuard] },
    {path: 'register', component: RegisterComponent},
    {path: 'main', component: MainComponent, canActivate: [authGuard] },
    {path: 'books/:id', component: BookDetailComponent },
    {path: 'my-library', component: UserLibraryComponent, canActivate: [authGuard] },
    {path: 'my-profile', component: UserProfileComponent, canActivate: [authGuard] }
];
