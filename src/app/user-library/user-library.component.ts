import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeInfo } from '../interfaces/volumeinfo';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';
import { Bookdb } from '../interfaces/bookdb';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.css']
})
export class UserLibraryComponent implements OnInit {
  favoriteBooks: Bookdb[] = [];

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.appService.getUserFavoriteBooks(userId).subscribe({
        next: (response) => {
          this.favoriteBooks = response.favoriteBooks;
        },
        error: (err) => {
          console.error('Error fetching favorite books:', err);
        }
      });
    } else {
      console.error('User ID not found');
    }
  }

  goToBookDetail(bookId: string) {
    this.router.navigate(['/books', bookId])
  }
}
