import { CompanyService } from './../services/company.service';
import { Component, OnInit } from '@angular/core';
import { startupCategory } from '../enums/enum.enum';
import { company } from '../interfaces/interface';

@Component({
  selector: 'sep-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss']
})
export class WaitingListComponent implements OnInit {

  constructor(private companyService: CompanyService) { }

  companyArray: company[] = [];
  companyWaitingArray:company [] = [];
  companyType = startupCategory;
  companyTypeObject = [];

  ngOnInit(): void {
    this.fetchCompanies();
    this.fetchWaitingCompanies();
    console.log(this.companyType);
  }

  fetchCompanies = () => {
    this.companyService.getCompanies().subscribe(data => {
      this.companyArray = data;
    })
  }

  fetchWaitingCompanies = () => {
    this.companyService.getWaitingList().subscribe((data) => {
      this.companyWaitingArray = data;
      console.log(
        'CompanyComponent ~ this.companyService.getCompanies ~ this.companyWaitingArray',
        this.companyWaitingArray
      );
    });
  };

  onApprove = (company:company,index:number) => {
    this.companyArray.push(company);
    console.log("WaitingListComponent ~  this.companyArray",  this.companyArray);
    this.companyService.postCompany(this.companyArray);
    this.onReject(index);
  }

  onReject = (index:number) => {
    this.companyWaitingArray.splice(index,1);
    this.companyService.sendToWaitingList(this.companyWaitingArray);
  }

}