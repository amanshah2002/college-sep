import { CompanyService } from './../services/company.service';
import { Component, OnInit } from '@angular/core';
import { companyAction, emailjsIds, startupCategory } from '../enums/enum.enum';
import { company } from '../interfaces/interface';

@Component({
  selector: 'sep-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss'],
})
export class WaitingListComponent implements OnInit {
  constructor(private companyService: CompanyService) {}

  companyArray: company[] = [];
  companyWaitingArray: company[] = [];
  companyType = startupCategory;
  companyTypeObject = [];

  ngOnInit(): void {
    // this.fetchCompanies();
    this.fetchWaitingCompanies();
    console.log(this.companyType);
  }

  // fetchCompanies = () => {
  //   this.companyService.getCompanies().subscribe((data) => {
  //     this.companyArray = data;
  //   });
  // };

  fetchWaitingCompanies = () => {
    this.companyService.getWaitingList().subscribe((data) => {
      console.log('waiting list:', data);
      this.companyWaitingArray = data;
    });
  };

  onApprove = (id: any, index: number) => {
    // this.companyArray.push(company);
    // console.log('WaitingListComponent ~  this.companyArray', this.companyArray);
    // this.companyService.postCompany(this.companyArray,companyAction.approved);
    // this.companyService.sendToWaitingList(this.companyWaitingArray,company,'rejected');

    this.companyService.postCompany(id).subscribe(data => {
      this.companyWaitingArray.splice(index, 1);
    })
  };

  onReject = (id: string, index: number) => {
    this.companyService.rejectCompany(id).subscribe(data => {
      console.log('company rejected:', data);
      let removedCompany = this.companyWaitingArray[index];
      removedCompany[
        'message'
      ] = `We regret to inform you that your company ${removedCompany.name} has been rejected by our admin staff`;
      this.companyWaitingArray.splice(index, 1);
      this.companyService.sendEmail(
        removedCompany,
        emailjsIds.companyAddedServiceId,
        emailjsIds.rejectApproveTemplateId,
        emailjsIds.companyAddedPublicKey
      );
    })
  };
}
