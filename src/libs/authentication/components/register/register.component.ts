import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  error: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  register(): void {
    const email = this.registerForm.controls['email'].value;
    const password = this.registerForm.controls['password'].value;
    const name = this.registerForm.controls['name'].value;

    this.authService.register(name, email, password).subscribe(
      () => {
        this.router.navigateByUrl('/login');
      },
      (error) => {
        this.error = error.error;
      }
    );
  }

  goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
