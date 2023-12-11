import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login-form/login-form.component';
import { MainComponent } from './main/main.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookDisplayComponent } from './book-display/book-display.component';
import { BookSearchFilterComponent } from './book-search-filter/book-search-filter.component';
import { UserLibraryComponent } from './user-library/user-library.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RegisterComponent,
    LoginComponent,
    MainComponent,
    BookSearchComponent,
    BookSearchFilterComponent,
    BookDisplayComponent,
    UserLibraryComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-club-frontend';
}
