import { CompanyService } from './../services/company.service';
import { Component, OnInit } from '@angular/core';
import { company, companyCategory } from '../interfaces/interface';
import { startupCategory } from '../enums/enum.enum';

@Component({
  selector: 'sep-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  constructor(private companyService: CompanyService) {}

  companyArray: company[] = [];
  companyType = startupCategory;
  companyTypeObject = [];

  ngOnInit(): void {
    this.fetchCompanies();
    console.log(this.companyType);

  }

  fetchCompanies = () => {
    this.companyService.getCompanies().subscribe((data) => {
      this.companyArray = [...data];
      console.log(
        'CompanyComponent ~ this.companyService.getCompanies ~ this.companyArray',
        this.companyArray
      );
    });
  };
}
