import { JobService } from 'src/app/services/job.service';
import { tap } from 'rxjs/operators';
import { appliedJobDetails, company, jobPost } from './../interfaces/interface';
import { emailjsIds, companyAction } from './../enums/enum.enum';
import { Router } from '@angular/router';
import { SnacbarService } from './snacbar.service';
import { CallAPIService } from './../core/call-api-service.service';
import { Injectable } from '@angular/core';
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
    private router: Router,
    private jobService: JobService,
  ) {}

  companyDetails: company[] = [];
  waitingList: company[] = [];
  currentJobs: jobPost[] & Partial<company>[] = [];

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
            this.sendToWaitingList(waitingCompany, companyData);
            return;
          }
        }
      });
    });
  };

  postCompany = (
    companyArray: company[],
    action: string,
    deletedCompany?: company
  ) => {

    this.callApiService
    .callPutAPI(apis.registerCompany, {}, companyArray)
      .subscribe((data) => {
        switch (action) {
          case companyAction.approved:
            let lastItem = data[data.length - 1];
            lastItem[
              'message'
            ] = `Your company ${lastItem.name} has been approved by our admin staff`;
            this.sendEmail(
              lastItem,
              emailjsIds.companyAddedServiceId,
              emailjsIds.rejectApproveTemplateId,
              emailjsIds.companyAddedPublicKey
              );
              break;

              case companyAction.deleted:
                this.snackbarService.open('Account Deleted!');
                localStorage.removeItem('user');
                sessionStorage.removeItem('user');
                // this.deleteAllJobPosts(deletedCompany as company);
                location.reload();

            break;

          case companyAction.update:
            this.snackbarService.open('Company updated');
            break;
          default:
            break;
        }
      });
  };

  deleteAllJobPosts = (deletedCompany: company) => {
    console.log(deletedCompany);
    this.getJobs().subscribe((data: jobPost[]) => {
      data.forEach((job, index: number) => {
        if (job.email.trim() == deletedCompany.email.trim()) {
          console.log(job.email);
          data.splice(index, 1);
        }
      });
      console.log('remaining jobs', data);
      this.postJob(data).subscribe(() => {
        this.deleteAllAppliedJobs(deletedCompany);
      });
    });
  };

  deleteAllAppliedJobs = (deletedCompany: company) => {
    this.jobService.getAllAppliedJobs().subscribe((data: any) => {
      console.log('All Jobs',data);
      data.forEach((jobApplied: appliedJobDetails,index: number) => {
        if(jobApplied.companyId.trim() === deletedCompany.email.trim()){
          this.jobService.deleteAppliedJob(jobApplied.id as string).subscribe();
        }
      })
      location.reload();
    })
  }

  getCompanies = () => {
    this.companyDetails = [];
    return this.callApiService.callGetAPI(apis.registerCompany).pipe(
      map((data: company[]) => {
        data?.forEach((companies: company) => {
          companies ? this.companyDetails.push(companies) : null;
        });
        return this.companyDetails;
      })
    );
  };

  sendToWaitingList = (
    companyData: company[],
    company?: company | any,
    status?: string
  ) => {
    console.log(companyData);
    console.log(company);

    this.callApiService
      .callPutAPI(apis.waitingList, {}, companyData)
      .subscribe((data) => {
        if (company && status != 'rejected') {
          this.sendEmail(
            company,
            emailjsIds.waitingListServiceId,
            emailjsIds.waitingListTemplateIds,
            emailjsIds.waitingListPublicKey
          );

          this.sendEmail(
            company,
            emailjsIds.companyAddedServiceId,
            emailjsIds.companyAddedTemplateId,
            emailjsIds.companyAddedPublicKey
          );
        } else if (company && status == 'rejected') {
          console.log('reject');
          console.log(company);
          this.sendEmail(
            company,
            emailjsIds.companyAddedServiceId,
            emailjsIds.rejectApproveTemplateId,
            emailjsIds.companyAddedPublicKey
          );
        }
        this.router.navigate(['/login']);
      });
    return;
  };

  getWaitingList = () => {
    this.waitingList = [];
    return this.callApiService.callGetAPI(apis.waitingList).pipe(
      map((data: company[]) => {
        data?.forEach((waitingList: company) => {
          waitingList ? this.waitingList.push(waitingList) : null;
        });
        return this.waitingList;
      })
    );
  };

  sendEmail = (
    company: company,
    serviceId: string,
    templateId: string,
    publicKey: string
  ) => {
    emailjs.send(serviceId, templateId, company as any, publicKey).then(
      (result: EmailJSResponseStatus) => {},
      (error) => {
        this.snackbarService.open(error.text);
      }
    );
  };

  postJob = (JobPosts: jobPost[]) => {
    console.log(JobPosts);
    return this.callApiService.callPutAPI(apis.postJob, {}, JobPosts);
  };

  getJobs = () => {
    return this.callApiService.callGetAPI(apis.postJob).pipe(
      tap((data: jobPost[]) => {
        if (data) {
          data.forEach((job: jobPost) => {
            job ? this.currentJobs.push(job) : null;
          });
        }
        return this.currentJobs;
      })
    );
  };
}


