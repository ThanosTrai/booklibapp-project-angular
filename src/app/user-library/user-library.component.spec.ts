import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLibraryComponent } from './user-library.component';

describe('UserLibraryComponent', () => {
  let component: UserLibraryComponent;
  let fixture: ComponentFixture<UserLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserLibraryComponent]
    });
    fixture = TestBed.createComponent(UserLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
