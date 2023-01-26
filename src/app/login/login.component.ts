import { accountType } from './../enums/enum.enum';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { startupCategory } from '../enums/enum.enum';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Country, State, ICountry, IState } from 'country-state-city';
import { map, of, switchMap } from 'rxjs';

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
  appearance: MatFormFieldAppearance = 'outline';

  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  visibility: boolean = false;
  loader: boolean = false;

  rememberMe: boolean = false;
  countries: ICountry[] = [];
  states: IState[] = [];
  phoneCode: string | undefined = '';
  isFocus = false;
  resume = '';

  preferredStartupType = [
    { label: 'Tech', value: startupCategory.tech },
    { label: 'AI', value: startupCategory.AI },
    { label: 'Finance', value: startupCategory.finance },
    { label: 'NGO', value: startupCategory.NGO },
    { label: 'agricultural', value: startupCategory.agriculture },
    { label: 'E-commerce', value: startupCategory.eCommerce },
    { label: 'Construction', value: startupCategory.construction },
    { label: 'IT', value: startupCategory.IT },
    { label: 'Marketing', value: startupCategory.marketing },
    { label: 'Garment', value: startupCategory.garment },
    { label: 'Chemical', value: startupCategory.chemical },
    { label: 'Petroleum', value: startupCategory.petroleum },
    { label: 'Jewelry', value: startupCategory.jewelry },
    { label: 'Other', value: startupCategory.other },
  ];

  ngOnInit(): void {
    this.getCountries();
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
    this.createForm();
  };

  onToggleVisibility = () => {
    this.visibility = !this.visibility;
  };

  onLogin = () => {
    let loginDetails = {
      ...this.loginForm.value,
      categoryType: this.category,
    };
    if(this.loginForm.value['resume']){
       loginDetails = {
        ...this.loginForm.value,
        resume: this.resume,
        categoryType: this.category,
      };
    }

    this.isLogin
      ? this.authenticationService.login(loginDetails, this.rememberMe)
      : this.authenticationService.signUp(loginDetails, this.rememberMe);
  };

  onSignupToggle = () => {
    this.isLogin = !this.isLogin;
    this.createForm();
  };

  createForm = () => {
    if (!this.isLogin) {
      this.loginForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        investorBusiness: new FormControl(
          null,
          this.category === accountType.investor ? Validators.required : null
        ),
        preferredStartupType: new FormControl(
          null,
          this.category === accountType.investor ? Validators.required : null
        ),
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        resume: new FormControl(null, this.category === accountType.employee ? Validators.required : null),
        country: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        // city: new FormControl(null, Validators.required),
        zipCode: new FormControl(
          null,
          this.category === accountType.investor ? Validators.required : null
        ),
        address: new FormControl(
          null,
          this.category === accountType.investor ? Validators.required : null
        ),
        contactNumber: new FormControl(
          null,
          this.category === accountType.investor ? Validators.required : null
        ),
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

  onCheck = (event: MatCheckboxChange) => {
    console.log(event);
    this.rememberMe = event.checked;
  };

  getCountries = () => {
    this.countries = Country.getAllCountries();
  };

  onCountrySelect = () => {
    let selectedCountry = this.loginForm.value?.country;
    console.log('LoginComponent ~ selectedCountry', selectedCountry);
    this.states = State.getStatesOfCountry(selectedCountry);
    console.log('LoginComponent ~ this.states', this.states);
    this.phoneCode = Country.getCountryByCode(selectedCountry)?.phonecode;
  };

  // onStateSelect = () => {
  //   this.cities = City.getCitiesOfState(this.loginForm.value?.country,this.loginForm.value?.state);
  // }

  toggleContactNumberFocus = () => {
    this.isFocus = !this.isFocus;
  };

  onFileSelect = ($event: any) => {
    let base64 = '';
    console.log();
    const file = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    let component = this;
    reader.onload = function() {
      let inputData:string = reader.result as string;
      let replaceValue = (inputData.split(',')[0]);
      base64 = inputData.replace(replaceValue + ",","");
      component.resume = base64;
      console.log("LoginComponent ~ resume", component.resume);
    }
  }
}
