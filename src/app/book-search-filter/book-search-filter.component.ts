import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-search-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-search-filter.component.html',
  styleUrls: ['./book-search-filter.component.css']
})
export class BookSearchFilterComponent {
  @Output() filterSelected = new EventEmitter<string>();

  onFilterSelect(filterType: string): void {
    this.filterSelected.emit(filterType);
  }
}
