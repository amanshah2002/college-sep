import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { startupCategory } from '../enums/enum.enum';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatFormFieldAppearance } from '@angular/material/form-field';

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
  isLogin: boolean = true;
  appearance:MatFormFieldAppearance = 'outline';

  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  visibility: boolean = false;
  loader: boolean = false;

  rememberMe:boolean = false;

  preferredStartupType = [
    { label: 'Tech', value: startupCategory.tech },
    { label: 'AI', value: startupCategory.AI },
    { label: 'Finance', value: startupCategory.finance },
    { label: 'NGO', value: startupCategory.NGO },
    { label: 'agricultural', value: startupCategory.agriculture },
    { label: 'E-commerce', value: startupCategory.eCommerce },
  ];

  ngOnInit(): void {
    this.authenticationService.isLoading.subscribe((data) => {
      this.loader = data;
    });
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
      ? this.authenticationService.login(loginDetails,this.rememberMe)
      : this.authenticationService.signUp(loginDetails,this.rememberMe);
  };

  onSignupToggle = () => {
    this.isLogin = !this.isLogin;
    if (!this.isLogin) {
      this.loginForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        investorBusiness: new FormControl(null, Validators.required),
        preferredStartupType: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
      });

      if (this.category == 'Company') {
        this.router.navigate(['register-company/new']);
      }
    } else {
      this.loginForm = new FormGroup({
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
      });
    }
  };

  onCheck = (event:MatCheckboxChange) => {
    console.log(event);
    this.rememberMe = event.checked;
    console.log("LoginComponent ~ this.rememberMe", this.rememberMe);
  }
}
