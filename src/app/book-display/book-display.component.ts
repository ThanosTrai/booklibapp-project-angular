import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../interfaces/book';
import { Router } from '@angular/router';
import { BookDetailComponent } from '../book-detail/book-detail.component';

@Component({
  selector: 'app-book-display',
  standalone: true,
  imports: [CommonModule, BookDetailComponent],
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent {
  @Input() books: Book[] | undefined;

  constructor(private router: Router) {}

  onBookSelect(book: Book): void {
    console.log('Selected book ID:', book);
  if (book && book.id) {
    this.router.navigate(['/books', book.id]);
  } else {
    console.error('Book ID is null or undefined');
  }
  }
  
}
