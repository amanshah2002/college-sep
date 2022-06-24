import { CompanyService } from './../services/company.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { AuthenticationService } from '../services/authentication.service';
import { company } from '../interfaces/interface';
import { startupCategory } from '../enums/enum.enum';
import { catchError } from 'rxjs';

const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'sep-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss'],
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  //   },

  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  // ]
})
export class RegisterCompanyComponent implements OnInit {
  constructor(private companyService: CompanyService) {}

  registerCompanyForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    founder: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,63}$')]),
    password: new FormControl(null, Validators.required),
    website: new FormControl(null, Validators.required),
    qrCode: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    product: new FormControl(null, Validators.required),
    dateOfReg: new FormControl(null, Validators.required),
  });

  currentDate: any;
  startupType = [
    { label: 'Tech', value: startupCategory.tech },
    { label: 'AI', value: startupCategory.AI },
    { label: 'Finance', value: startupCategory.finance },
    { label: 'NGO', value: startupCategory.NGO },
    { label: 'agricultural', value: startupCategory.agriculture },
    { label: 'E-commerce', value: startupCategory['E-commerce'] },
  ];

  ngOnInit(): void {
    this.currentDate = moment();
    console.log(
      'RegisterCompanyComponent ~ ngOnInit ~ this.currentDate',
      this.currentDate
    );
  }

  onSave = () => {
    console.log(
      'RegisterCompanyComponent ~ this.registerCompanyForm.getRawValue()',
      this.registerCompanyForm.getRawValue()
    );
    const companyData: company = this.registerCompanyForm.getRawValue();
    this.companyService.registerCompany(companyData)
  };

  onClear = () => {
    this.registerCompanyForm.reset();
  };
}
