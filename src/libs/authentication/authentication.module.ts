import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './components/log-in/log-in.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LogInComponent, RegisterComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [LogInComponent, RegisterComponent],
})
export class AuthenticationModule {}
