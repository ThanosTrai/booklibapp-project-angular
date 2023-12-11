import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { BookSearchComponent } from '../book-search/book-search.component';
import { BookDisplayComponent } from '../book-display/book-display.component';
import { Book } from '../interfaces/book';
import { BookSearchFilterComponent } from '../book-search-filter/book-search-filter.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,
            FormsModule,
            BookSearchComponent,
            BookDisplayComponent,
            BookSearchFilterComponent,
            RouterModule
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
searchResults: Book[] | undefined;
selectedFilterType: string = '';
  
constructor(private authService: AuthService, private router: Router, private appService: AppService) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Navigate to login or any other route
  }

  handleSearchResults(books: Book[]) {
    this.searchResults = books;
    console.log('Search results received:', this.searchResults);
  }


  handleFilterSelected(filterType: string): void {
    this.selectedFilterType = filterType;
  }
  

}
