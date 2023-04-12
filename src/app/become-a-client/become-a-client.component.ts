import { Component, OnInit } from '@angular/core';
import clientDetails from './client-config.json';
import { clientData, company } from '../interfaces/interface';
import { FormGroup } from '@angular/forms';
import { createForm } from './client-utils';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { ClientService } from '../services/client.service';
import { SnacbarService } from '../services/snacbar.service';
import { snackbarMessage } from '../enums/enum.enum';
@Component({
  selector: 'sep-become-a-client',
  templateUrl: './become-a-client.component.html',
  styleUrls: ['./become-a-client.component.scss'],
})
export class BecomeAClientComponent implements OnInit {
  clientConfig: clientData = clientDetails;
  clientForm = new FormGroup({});

  header = this.clientConfig.clientPage.header;
  subHeader = this.clientConfig.clientPage.subHeader;

  appearance: MatFormFieldAppearance = 'outline';

  companies: company[] = [];
  company!: company;

  companyId: number = 0;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private clientService: ClientService,
    private snackbarService: SnacbarService,
    private router: Router
  ) {
    this.clientForm = createForm(this.clientConfig.clientForm);
  }

  ngOnInit(): void {
    this.getCompanyById();
  }

  private getCompanyById(): void {
    this.route.params
      .pipe(
        tap((params) => {
          this.companyId = params['id'];
        }),
        switchMap(() => {
          return this.companyService.getCompanies();
        })
      )
      .subscribe((companies) => {
        this.companies = companies;
        this.company = this.companies[this.companyId];
        this.patchFormValue();
      });
  }

  private patchFormValue(): void {
    this.clientForm.patchValue({
      companyName: this.company.name,
      companyFounder: this.company.founder,
      companyEmail: this.company.email,
      companyDescription: this.company.description,
    });
  }

  private generatePayload(): { [key: string]: string } {
    let payload = {};
    this.authenticationService.getUser.subscribe((user) => {
      payload = {
        ...this.clientForm.value,
        clientName: `${user.name} ${user.lastName}`,
        clientEmail: user.email,
      };
    });
    return payload;
  }

  onSubmit(): void {
    const payload = this.generatePayload();
    this.clientService.assignWork(payload).subscribe(() => {
      this.router.navigate(['startups'])
    },
   )

  }
}
