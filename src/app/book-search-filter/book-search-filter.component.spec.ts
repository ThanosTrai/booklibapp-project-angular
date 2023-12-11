import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchFilterComponent } from './book-search-filter.component';

describe('BookSearchFilterComponent', () => {
  let component: BookSearchFilterComponent;
  let fixture: ComponentFixture<BookSearchFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BookSearchFilterComponent]
    });
    fixture = TestBed.createComponent(BookSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
