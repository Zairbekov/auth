import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.interface';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  loginForm: FormGroup
  submitted = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    if (this.loginForm.invalid) return;
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      personal_data_access: true
    }
    this.authService.login(user).subscribe(() => {
      this.loginForm.reset();
      this.submitted = false;
      this.router.navigate(['/main'])
    });
  }

}
