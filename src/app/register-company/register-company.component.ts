import { CompanyService } from './../services/company.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import _moment from 'moment';
import { company } from '../interfaces/interface';
import { accountType, startupCategory } from '../enums/enum.enum';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';

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
})
export class RegisterCompanyComponent implements OnInit {
  constructor(private companyService: CompanyService, private dialog: MatDialog) {}

  companyId: number | 'new' = 0;
  isEdit = false;
  companyArray: company[] = [];
  company: any;
  appearance: MatFormFieldAppearance = 'outline';

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
    product: new FormControl(null),
    dateOfReg: new FormControl(null, Validators.required),
  });

  currentDate: any;
  startupType = [
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
    this.currentDate = moment();
  }

  onSave = () => {
    const companyData: company = {
      ...this.registerCompanyForm.getRawValue(),
      categoryType: accountType.company,
    };

    this.companyService.registerCompany(companyData);
    this.onClear();
  };

  onClear = () => {
    this.registerCompanyForm.reset();
  };
}
