import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchingValidator } from '../shared/passwordmatch-validator.directive';
import { RegisterUser } from '../interfaces/registeruser';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  regForm: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private appService: AppService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.regForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W).{6,}')]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: passwordMatchingValidator });
  }

  onRegister() {
    if (this.regForm.valid) {
      this.appService.registerUser(this.regForm.value as RegisterUser).subscribe({
        next: (response) => {
          this.showSuccess();
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.error && error.error.errors) {
            this.errorMessages = Object.values(error.error.errors);
            this.showError();
          } else {
            this.errorMessages = ['An unexpected error occurred. Please try again.'];
          }
        }
      });
    }
  }

  showSuccess() {
    this.toastr.success("Your registration was successful!", "Welcome!");
  }

  showError() {
    this.toastr.error("Error", "Oops! Something went wrong.");
  }
}
