import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { Book } from '../interfaces/book';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent {
  searchQuery: string = '';
  books: Book[] = [];
  noResultsMessage: string | null = null;
  errorMessage: string | null = null;

  @Output() filterSelected = new EventEmitter<string>();
  @Output() searchResults = new EventEmitter<Book[]>();
  @Input() filterType: string = '';

  constructor(private appService: AppService) {}

  searchBooks(): void {
    console.log("searchQuery:", this.searchQuery)
    if (!this.searchQuery) return;
  
    let searchObservable: Observable<Book[]>;
  
    switch (this.filterType) {
      case 'title':
        searchObservable = this.appService.searchBooksByTitle(this.searchQuery);
        break;
      case 'author':
        searchObservable = this.appService.searchBooksByAuthor(this.searchQuery);
        break;
      case 'category':
        searchObservable = this.appService.searchBooksByCategory(this.searchQuery);
        break;
      case 'isbn':
        searchObservable = this.appService.searchBooksByIsbn(this.searchQuery);
        break;
      default:
        searchObservable = this.appService.searchBooks(this.searchQuery);
        break;
    }
    
    searchObservable.subscribe({
      next: (books: Book[]) => {
        if (books.length === 0) {
          this.noResultsMessage = 'No results found for your search query.';
          console.log(this.noResultsMessage);
        } else {
        console.log('Books fetched:', books)
        this.books = books;
        this.searchResults.emit(this.books);
        }
      },
      error: (error) => {
        if (error.status === 404) {
          this.noResultsMessage = 'No books results found with your search criteria';
          console.log(this.noResultsMessage);
        } else {
        this.errorMessage = 'An error occurred while fetching books.';
        }
        this.searchResults.emit([]);
      }
    });
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
    this.searchBooks();
  }

     
  onFilterSelect(filterType: string): void {
    this.filterSelected.emit(filterType);
  }
}
