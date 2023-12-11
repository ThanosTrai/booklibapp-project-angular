import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';
import { BookDetails } from '../interfaces/book-details';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: BookDetails | undefined;
  userId: string | null = null;

  constructor (
    private route: ActivatedRoute,
    private appService: AppService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  
  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.appService.getBookDetails(bookId).subscribe({
        next: (data: BookDetails) => {
          console.log('Received data:', data)
          this.book = data;
          console.log('Book set:', this.book);
        },
        error: (error) => {
          console.error('Error fetching book details', error);
        },
      });
    }
  }

  toggleFavorite(): void {
    if (!this.book) {
      console.error('No book to toggle favorite status');
      return;
    }

    if (this.book.favorited) {
      this.appService.removeBookFromFavorites(this.userId!, this.book.book.id).subscribe({
        next: () => {
          this.removeSuccess()
          this.book!.favorited = false;
        },
        error: (error) => {
          console.error('Error removing the book from favorites:', error);
        }
      });
    } else {
      this.appService.addBookToFavorites(this.userId!, this.book.book.id).subscribe({
        next: () => {
          this.book!.favorited = true;
          this.addSuccess();
        },
        error: (error) => {
          console.error('Error adding book to favorites:', error);
        }
      });
    }
  }

  addSuccess() {
    this.toastr.success("Book added to favorites successfully", "Favorited");
  }

  removeSuccess() {
    this.toastr.error("Book removed from favorites", 'Removed')
  }
}
