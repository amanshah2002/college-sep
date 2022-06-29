import { SnacbarService } from './../services/snacbar.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  constructor(
    private companyService: CompanyService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private snackbarService: SnacbarService
  ) {}

  companyId: number | 'new' = 0;
  isEdit: boolean = false;
  companyArray:company[] = [];
  company:any;

  registerCompanyForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    founder: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,63}$'),
    ]),
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
    this.getParams();
    this.currentDate = moment();
  }

  getParams = () => {
    this.activeRoute.params.subscribe((params: Params) => {
      this.companyId = params['id'];
      if (this.companyId == 'new') {
        this.isEdit = false;
      } else {
        this.isEdit = true;
        this.getCompany();
      }
    });
  };

  getCompany = () => {
    this.companyService.getCompanies().subscribe(data =>{
      this.companyArray = data;
      this.company = this.companyArray[+this.companyId];
      this.company?this.patchValue() : this.snackbarService.open('Company does not exist!');
    })
  };

  patchValue = () => {
    this.registerCompanyForm.patchValue(this.company);
  }

  onSave = () => {
    const companyData: company = this.registerCompanyForm.getRawValue();
    if(!this.isEdit){
      this.companyService.registerCompany(companyData);
    }else{
      this.companyArray[+this.companyId] = this.registerCompanyForm.getRawValue();
      this.companyService.postCompany(this.companyArray);
      this.snackbarService.open('Company updated');
      this.router.navigate(['startups']);
    }
    this.onClear();
  };

  onClear = () => {
    this.registerCompanyForm.reset();
  };
}
