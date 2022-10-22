import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnacbarService } from './../../services/snacbar.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { accountType, companyAction, startupCategory } from 'src/app/enums/enum.enum';
import { company, loginData } from 'src/app/interfaces/interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'sep-edit-company-account',
  templateUrl: './edit-company-account.component.html',
  styleUrls: ['./edit-company-account.component.scss'],
})
export class EditCompanyAccountComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private companyService: CompanyService,
    private snackbarService: SnacbarService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  @Input() accountType: string | undefined = '';
  @Input() userData: loginData = {};

  appearance: MatFormFieldAppearance = 'fill';
  startupType = [
    { label: 'Tech', value: startupCategory.tech },
    { label: 'AI', value: startupCategory.AI },
    { label: 'Finance', value: startupCategory.finance },
    { label: 'NGO', value: startupCategory.NGO },
    { label: 'agricultural', value: startupCategory.agriculture },
    { label: 'E-commerce', value: startupCategory.eCommerce },
  ];
  companyArray: company[] = [];
  companyId: number = -1;
  company: any;
  isSaveDisabled = true;

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

  ngOnInit() {
    this.patchCompanyValue();
    this.checkFormValueChanges();
  }

  checkFormValueChanges = () => {
    this.registerCompanyForm.valueChanges.subscribe(data => {
      if(data){
        this.isSaveDisabled = false;
      }
    })
  }

  onSave = () => {
    const companyData:company = {...this.registerCompanyForm.getRawValue(), categoryType: accountType.company};
    const emailExistsFlag = this.verifyEmail(companyData);
    if(emailExistsFlag){
      return;
    }else{
      this.companyArray[+this.companyId] = companyData;
      this.companyService.postCompany(this.companyArray,companyAction.update);
      this.router.navigate(['startups']);
      this.updateUserInStorage(companyData);
      this.authService.autoLogin();
      this.authService.user.next(companyData);
    }
  };

  onClear = () => {
    this.registerCompanyForm.reset();
  };

  openDeleteAccountDialog = () => {
    const deleteDialogConfig = {data:{
      heading: `Are you sure you want to delete your account?`,
      content: `This action is irreversible, you will lose all your data!`,
      button: 2,
    },
    autoFocus:false
  }
    const dialogRef = this.dialog.open(DialogComponent,deleteDialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.deleteAccount();
      }
    })
  }

  deleteAccount = () => {
    console.log(this.companyId);
    this.companyArray.splice(this.companyId,1);
    console.log("EditCompanyAccountComponent ~ deleteAccount ~ companyArray", this.companyArray);
    this.companyService.postCompany(this.companyArray,companyAction.deleted);
  }

  getCompany = () => {
    this.companyService.getCompanies().subscribe((data) => {
      this.companyArray = data;
      this.companyId = this.getCompanyById();
      this.company = this.companyArray[this.companyId];
    });
  };

  getCompanyById = () => {
    let companyId: number = -1;
    this.companyArray.forEach((company, index) => {
      if (company.email === this.userData.email) {
        companyId = index;
      }
    });
    return companyId;
  };

  patchCompanyValue = () => {
    this.getCompany();
    this.registerCompanyForm.patchValue(this.userData);
  };

  updateUserInStorage = (companyData:company) => {
    const sessionUser = JSON.parse(sessionStorage.getItem('user') || 'null');
    const localUser = JSON.parse(localStorage.getItem('user') || 'null');

    if(sessionUser){
      sessionStorage.setItem('user',JSON.stringify(companyData));
    }
    else if(localUser){
      localStorage.setItem('user',JSON.stringify(companyData));
    }
  }

  verifyEmail = (companyData:company) => {
    let flag = false;
    this.companyArray.forEach((company,index) => {
      if(index == this.companyId){
        null;
      }else{
        if(companyData.email === company.email){
          this.snackbarService.open('The updated email is already in use by another company!');
          flag = true
          return;
        }
      }
    })
    return flag;
  }
}
