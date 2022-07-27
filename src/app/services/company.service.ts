import { Router } from '@angular/router';
import { SnacbarService } from './snacbar.service';
import { CallAPIService } from './../core/call-api-service.service';
import { Injectable } from '@angular/core';
import { company } from '../interfaces/interface';
import { map, of, throwError, catchError } from 'rxjs';
import { apis } from '../enums/enum.enum';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';


@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(
    private callApiService: CallAPIService,
    private snackbarService: SnacbarService,
    private router: Router
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
            this.sendToWaitingList(waitingCompany,companyData);
            return;
          }
        }
      });
    }); //TODO: repeat email not allowed on register company to be implemented.
  };

  postCompany = (companyArray: company[]) => {
    this.callApiService
      .callPutAPI(apis.registerCompany, {}, companyArray)
      .subscribe((data) => {
        console.log(data);
      });
  };

  getCompanies = () => {
    this.companyDetails = [];
    return this.callApiService.callGetAPI(apis.registerCompany).pipe(
      map((data) => {
        this.companyDetails = data;
        return this.companyDetails;
      })
    );
  };


  sendToWaitingList = (companyData: company[],company?: company | any) => {
    console.log(companyData);
    this.callApiService
      .callPutAPI(apis.waitingList, {}, companyData)
      .subscribe((data) => {
        company?
        this.sendEmail(company) :
        null;
        this.router.navigate(['await-confirmation']);
      });
    return;
  };

  getWaitingList = () => {
    this.waitingList = [];
    return this.callApiService.callGetAPI(apis.waitingList).pipe(
      map((data) => {
        this.waitingList = data;
        return this.waitingList;
      })
    );
  };

  sendEmail = (company:company) => {
    emailjs.send(
      'service_6yspp6l',
      'template_pwi242l',
      company as any,
      '1zcOXHZVDdsQUjkkk'
    ).then(
      (result: EmailJSResponseStatus) => {
      },
      (error) => {
        this.snackbarService.open(error.text);
      }
    );
  }
}
