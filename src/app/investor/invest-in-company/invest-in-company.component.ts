import { CompanyService } from 'src/app/services/company.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { company } from 'src/app/interfaces/interface';

@Component({
  selector: 'sep-invest-in-company',
  templateUrl: './invest-in-company.component.html',
  styleUrls: ['./invest-in-company.component.scss']
})
export class InvestInCompanyComponent implements OnInit {

  company!: company;
  companies: company[] = [];
  companyIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService) { }

  ngOnInit() {
    this.getCompanyDetails();
  }

  private getCompanyDetails(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.companyIndex = params['id'];
      this.getCompanyById(this.companyIndex);
    });
  }

  private getCompanyById(index: number): void {
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
      this.company = this.companies[index];
      console.log('received', this.company);

    })
  }
}
