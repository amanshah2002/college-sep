import { loginData } from './../interfaces/interface';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sep-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  category: string = 'Investor';
  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  visibility: boolean = false;
  isLogin: boolean = true;
  loader:boolean = false;

  ngOnInit(): void {
    this.authenticationService.isLoading.subscribe(data => {
      this.loader = data;
    })
  }

  changeSignInType = (category: string) => {
    this.category = category;
    if (!this.isLogin) {
      if (this.category == 'Company') {
        this.router.navigate(['register-company/new']);
      }
    }
  };

  onToggleVisibility = () => {
    this.visibility = !this.visibility;
  };

  onLogin = () => {
    const loginDetails = { ...this.loginForm.value, type: this.category };

    this.isLogin
      ? this.authenticationService.login(loginDetails)
      : this.authenticationService.signUp(loginDetails);
  };

  onSignupToggle = () => {
    this.isLogin = !this.isLogin;
    if (!this.isLogin) {
      if (this.category == 'Company') {
        this.router.navigate(['register-company/new']);
      }
    }
  };
}
