import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgModel} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {IRequestLogIn} from '../../../interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginError!: string;
  @ViewChild('email') emailModel!: NgModel;
  @ViewChild('password') passwordModel!: NgModel;

  public loginForm: { email: string; password: string } = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  public handleLogin(event: Event) {
    event.preventDefault();
    if (!this.emailModel.valid) {
      this.emailModel.control.markAsTouched();
    }
    if (!this.passwordModel.valid) {
      this.passwordModel.control.markAsTouched();
    }
    if (this.emailModel.valid && this.passwordModel.valid) {
      const requestLogIn: IRequestLogIn = {
        email: this.loginForm.email,
        password: this.loginForm.password
      };
      this.authService.login(requestLogIn).subscribe({
        next: () => this.router.navigateByUrl('/app/dashboard'),
        error: (err: any) => {
          this.loginError = err.error.message || 'An error occurred. Please try again.';
        },
      });
    }
  }

}
