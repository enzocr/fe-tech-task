import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IRequestProduct, IRequestUser, IUser } from '../../../interfaces';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgOptimizedImage],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SigUpComponent {
  public signUpError!: string;
  public validSignup!: boolean;
  @ViewChild('email') emailModel!: NgModel;
  @ViewChild('password') passwordModel!: NgModel;

  public user: IUser = {};

  constructor(private router: Router, private authService: AuthService) {}

  public clearError() {
    this.signUpError = '';
  }

  public handleSignup(event: Event) {
    event.preventDefault();

    // Clear previous error messages
    this.signUpError = '';

    if (!this.emailModel.valid) {
      this.emailModel.control.markAsTouched();
    }
    if (!this.passwordModel.valid) {
      this.passwordModel.control.markAsTouched();
    }
    if (this.emailModel.valid && this.passwordModel.valid) {
      const userRequest: IRequestUser = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
      };
      this.authService.signup(userRequest).subscribe({
        next: () => {
          this.validSignup = true;
          this.signUpError = ''; // Reset error message on successful signup
        },
        error: (err: any) => {
          if (err.status === 409) {
            this.signUpError = 'Email is already in use. Please try another one.';
          } else {
            this.signUpError = 'An unexpected error occurred. Please try again later.';
          }
        },
      });
    }
  }
}
