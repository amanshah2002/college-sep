import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from './../services/company.service';
import { Component, OnInit } from '@angular/core';
import { company } from '../interfaces/interface';
import { startupCategory } from '../enums/enum.enum';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sep-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
  ) {}

  companyArray: company[] = [];
  companyType = startupCategory;
  companyTypeObject = [];
  searchValue = '';
  filteredCompany: company[] = [];

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies = () => {
    this.companyService.getCompanies().subscribe((data) => {
      this.companyArray = [...data];
      this.filteredCompany = this.companyArray;
    });
  };

  onSearch = () => {
    this.filteredCompany = this.companyArray;
    this.filteredCompany = this.filteredCompany.filter((company) => {
      return company.name.toLowerCase().includes(this.searchValue);
    });
    console.log("CompanyComponent ~ filteredCompany", this.filteredCompany);
  };

  onClearSearch = () => {
    this.searchValue = '';
    this.onSearch();
  }

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
}
