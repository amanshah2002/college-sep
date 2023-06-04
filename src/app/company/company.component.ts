import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CompanyService } from './../services/company.service';
import { Component, OnInit } from '@angular/core';
import { company, loginData } from '../interfaces/interface';
import { startupCategory } from '../enums/enum.enum';

export interface routeObj {
  invest: string;
  client: string;
}
@Component({
  selector: 'sep-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  companyArray: company[] = [];
  companyTypeObject = [];
  filteredCompany: company[] = [];
  routeObj: routeObj = { invest: 'invest/', client: 'become-a-client/' };

  companyType = startupCategory;
  searchValue = '';
  user: loginData = {};

  ngOnInit(): void {
    this.fetchCompanies();
    this.getUser();
  }

  fetchCompanies = () => {
    this.companyService.getCompanies().subscribe((data) => {
      console.log('companies', data);

      this.companyArray = [...data];
      this.filteredCompany = this.companyArray;
    });
  };

  onSearch = () => {
    this.filteredCompany = this.companyArray;
    this.filteredCompany = this.filteredCompany.filter((company) => {
      return company.name.toLowerCase().includes(this.searchValue);
    });
    console.log('CompanyComponent ~ filteredCompany', this.filteredCompany);
  };

  onClearSearch = () => {
    this.searchValue = '';
    this.onSearch();
  };

  // onDelete = (index: number) => {
  //   this.dialog
  //     .open(DialogComponent, {
  //       data: {
  //         heading: 'Are you sure',
  //         content: 'Are you sure you want to delete this company?',
  //         button: 2,
  //       },
  //       autoFocus: false,
  //     })
  //     .afterClosed()
  //     .subscribe((data) => {
  //       if (data) {
  //         this.companyArray.splice(index, 1);
  //         this.companyService.postCompany(this.companyArray,companyAction.deleted);
  //         return;
  //       } else {
  //         return;
  //       }
  //     });
  // };

  private getUser(): void {
    this.authService.getUser.subscribe((user: loginData) => {
      this.user = user;
    });
  }

  onRedirect(index: number, uid: string): void {
    console.log(index);

    this.router.navigate([this.routeObj[uid as keyof routeObj] + index]);
  }
}
