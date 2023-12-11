import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { LoginUser } from '../interfaces/loginuser';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user!: LoginUser;
  
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}
  
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.appService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          const accessToken = response?.access_token;
          const refreshToken = response?.refresh_token;

          // console.log(accessToken)
          // console.log(refreshToken)

          if (accessToken && refreshToken) {
            this.authService.saveToken(accessToken, refreshToken);
          // Redirect to the main page
          this.router.navigate(['/main']);
          this.showSuccess()
        } else {
          this.showError()
        }
      },
        error: (error) => {
          console.error(error);
          this.showError()
        }
      });
    } else {
      console.error('Login form is not valid.');
    }
  }

  showSuccess() {
    this.toastr.success("You were successfully logged in!", "Welcome!");
  }

  showError() {
    let errorMessage = 'Login failed. Please try again.';
    this.toastr.error(errorMessage, 'Error')
  }
}
