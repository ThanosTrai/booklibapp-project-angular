import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDisplayComponent } from './book-display.component';

describe('BookDetailsComponent', () => {
  let component: BookDisplayComponent;
  let fixture: ComponentFixture<BookDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BookDisplayComponent]
    });
    fixture = TestBed.createComponent(BookDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
