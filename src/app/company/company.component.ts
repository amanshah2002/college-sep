import { loginData } from './../interfaces/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from './../services/company.service';
import { Component, OnInit } from '@angular/core';
import { company } from '../interfaces/interface';
import { startupCategory } from '../enums/enum.enum';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'sep-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog,
    private snackbarService: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

  companyArray: company[] = [];
  companyType = startupCategory;
  companyTypeObject = [];

  ngOnInit(): void {
    this.fetchCompanies();
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
  //         this.companyService.postCompany(this.companyArray);
  //         this.snackbarService.open('Company deleted successfully!');
  //         return;
  //       } else {
  //         return;
  //       }
  //     });
  // };
}
