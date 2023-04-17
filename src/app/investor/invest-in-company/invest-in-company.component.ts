import { loginData } from './../../interfaces/interface';
import { EmailService } from './../../services/email.service';
import { SnacbarService } from 'src/app/services/snacbar.service';
import { InvestmentService } from './../../services/investment.service';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { company } from 'src/app/interfaces/interface';
import { emailjsIds } from 'src/app/enums/enum.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'sep-invest-in-company',
  templateUrl: './invest-in-company.component.html',
  styleUrls: ['./invest-in-company.component.scss'],
})
export class InvestInCompanyComponent implements OnInit {
  company!: company;
  companies: company[] = [];
  companyIndex = 0;
  currentUser: loginData = {};

  appearance: MatFormFieldAppearance = 'outline';

  investForm: FormGroup = new FormGroup({
    amount: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]),
    companyName: new FormControl(null, Validators.required),
    panNumber: new FormControl(null, Validators.required),
    companyFounder: new FormControl(null, Validators.required),
    companyEmail: new FormControl(null, Validators.required),
    companyDescription: new FormControl(null, Validators.required),
  });

  constructor(
    private companyService: CompanyService,
    private authService: AuthenticationService,
    private investmentService: InvestmentService,
    private snackbarService: SnacbarService,
    private emailService: EmailService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCompanyDetails();
    this.getCompanyById(this.companyIndex);
    this.getCurrentUser();
  }

  private getCompanyDetails(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.companyIndex = params['id'];
    });
  }

  private getCompanyById(index: number): void {
    this.companyService.getCompanies().subscribe((companies) => {
      if (companies) {
        this.companies = companies;
        this.company = this.companies[index];
        this.patchFormValue();
      }
    });
  }

  private patchFormValue(): void {
    this.investForm.patchValue({
      companyName: this.company.name,
      companyFounder: this.company.founder,
      companyEmail: this.company.email,
      companyDescription: this.company.description,
    });
  }

  private getCurrentUser(): void {
    this.authService.getUser.subscribe((user: loginData) => {
      user ? (this.currentUser = user) : null;
    });
  }

  onSubmit(): void {
    const payload = {
      ...this.investForm.value,
      name: this.currentUser.name,
      investorEmail: this.currentUser.email,
    }
    this.investmentService.invest(payload).subscribe(() => {
      const message =
        'The company has been notified about your interest of investment in them!';
      const emailPayload = {
        message: `${this.currentUser?.name} has shown an interest to invest ${this.investForm.value['amount']} in your company, please contact them at ${this.currentUser.email}`,
        email: this.company.email,
      };
      this.snackbarService.open(message);
      this.router.navigate(['startups']);
      this.emailService.send(
        emailjsIds.companyAddedServiceId,
        emailjsIds.rejectApproveTemplateId,
        emailPayload,
        emailjsIds.companyAddedPublicKey
      );
    });
  }

  clearForm = (): void => {
    this.investForm.reset();
  }
}
