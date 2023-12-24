import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements AfterViewInit {
  @ViewChild('loginContainer') loginContainer!: ElementRef;

  error: string | null = null;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngAfterViewInit() {
    const viewportHeight = window.outerHeight + 70;
    this.loginContainer.nativeElement.style.height = viewportHeight + 'px';
  }

  login(): void {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.logIn(email, password).subscribe(
      (x) => {
        this.router.navigateByUrl('/map');
      },
      (error) => {
        this.error = error.error;
      }
    );
  }

  goToRegistration(): void {
    this.router.navigateByUrl('/register');
  }
}
