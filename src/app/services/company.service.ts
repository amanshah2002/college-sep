import { SnacbarService } from './snacbar.service';
import { CallAPIService } from './../core/call-api-service.service';
import { Injectable } from '@angular/core';
import { company } from '../interfaces/interface';
import { map, of, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(
    private callApiService: CallAPIService,
    private snackbarService: SnacbarService
  ) {}

  companyDetails: company[] = [];
  waitingList: company[] = [];

  registerCompany = (companyData: company) => {
    let companyArray: any[] = [];
    let flag = false;
    this.getCompanies().subscribe((company) => {
      this.getWaitingList().subscribe((waitingCompany) => {
        if (company || waitingCompany) {
          companyArray = [company, waitingCompany];
          console.log(
            'CompanyService ~ this.getWaitingList ~ companyArray',
            companyArray
          );
          companyArray.map((data) => {
            data?.map((element: company) => {
              element?.email.toLowerCase() == companyData?.email.toLowerCase()
                ? (flag = true)
                : null;
              console.log(flag);
            });
          });

          if (flag == true) {
            this.snackbarService.open('A user already exists with this email');
            return;
          } else {
            waitingCompany
              ? waitingCompany.push(companyData)
              : (waitingCompany = [companyData]);
            this.snackbarService.open(
              'Company has been successfully sent to waiting list'
            );
            this.sendToWaitingList(waitingCompany);
            return;
          }
        }
      });
    }); //TODO: repeat email not allowed on register company to be implemented.
  };

  postCompany = (companyArray: company[]) => {
    this.callApiService
      .callPutAPI('register-company.json', {}, companyArray)
      .subscribe((data) => {
        console.log(data);
      });
  };

  getCompanies = () => {
    this.companyDetails = [];
    return this.callApiService.callGetAPI('register-company.json').pipe(
      map((data) => {
        this.companyDetails = data;
        return this.companyDetails;
      })
    );
  };

  sendToWaitingList = (companyData: company[]) => {
    console.log(companyData);
    this.callApiService
      .callPutAPI('waiting-list.json', {}, companyData)
      .subscribe((data) => {
        console.log(data);
      });
    return;
  };

  getWaitingList = () => {
    this.waitingList = [];
    return this.callApiService.callGetAPI('waiting-list.json').pipe(
      map((data) => {
        this.waitingList = data;
        return this.waitingList;
      })
    );
  };
}
