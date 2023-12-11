import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';
import { UserProfile } from '../interfaces/user-profile';
import { UserUpdateInfo } from '../interfaces/user-update-info';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileImageUrl: string = "assets/images/default-profile.png";
  userProfileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userProfileForm = this.fb.group({
      firstname: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      lastname: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&].{6,}$")]],
      dateOfBirth: [''],
      profilePicture: ['', [Validators.pattern('^(http[s]?:\\/\\/)?([^\\/\\s]+\\/)(.*)$')]]
    });
    
    this.loadUserProfile();

    this.userProfileForm.get('profilePicture')?.valueChanges.subscribe((value: string) => {
      this.updateProfileImage(value);
    })
  }

  loadUserProfile(): void {
    this.appService.getUserProfile().subscribe({
      next: (userProfile: UserProfile) => {
        this.userProfileForm.patchValue({
          firstname: userProfile.firstname,
          lastname: userProfile.lastname,
          dateOfBirth: userProfile.dateOfBirth,
          profilePicture: userProfile.profilePicture ? userProfile.profilePicture : ''
        });
        this.profileImageUrl = userProfile.profilePicture ? userProfile.profilePicture : 'assets/images/default-profile.png';
      },
      error: (error) => {
        console.error("Could not get user details", error)
        this.profileImageUrl = 'assets/images/default-profile.png';
      }
    })
  }

  onSubmit(): void {
    if (this.userProfileForm.valid) {
      const updateData: UserUpdateInfo = this.userProfileForm.value;
      this.appService.updateUser(updateData).subscribe({
        next: (response) => {
          console.log('User profile updated successfully!', response);
          this.toastr.success("User updated successfully", "Success in Update");
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          let errorMessage = "Failed to update user";
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          } 
          this.toastr.error(errorMessage, "Error in update");
          }
      
      });
    }
  }

  confirmAccountDeletion(): void {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone")) {
      this.appService.deleteUser().subscribe({
        next: () => {
          console.log("Account delete successfully");
          this.toastr.success("Account deleted successfully", "Success");
          this.authService.logout(); // Clear authentication state
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error("Error occurred during account deletion:", error)
          this.toastr.error("Failed to delete account", "Error")
        }
      })
    }
  }

  updateProfileImage(url: string) {
    if (url) {
      this.profileImageUrl = url;
    } else {
      this.profileImageUrl = "assets/images/default-profile.png";
    }
  }
}
