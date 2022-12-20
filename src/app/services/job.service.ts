import { map, tap, filter, catchError, throwError, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { CallAPIService } from '../core/call-api-service.service';
import { apis } from '../enums/enum.enum';
import { appliedJobDetails } from '../interfaces/interface';
import { SnacbarService } from './snacbar.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(
    private callApiService: CallAPIService,
    private snackbarService: SnacbarService
  ) {}

  postAppliedJob = (appliedJobDetails: appliedJobDetails) => {
    return this.getAllAppliedJobs().pipe(
      map((resp: appliedJobDetails[]) => {
        resp.forEach((ele) => {
          if (
            ele.jobPostId === appliedJobDetails.jobPostId &&
            appliedJobDetails.userEmail === ele.userEmail
          ) {
            throw new Error('Already applied for job in this company');
          }
        });
      }),
      switchMap(() => {
        return this.callApiService.callPostAPI(
          apis.applyJob,
          appliedJobDetails
        );
      }),
      catchError((error) => {
        console.log(error);
        this.snackbarService.open(error);
        throw error;
      })
    );
  };

  getAllAppliedJobs = () => {
    return this.callApiService.callGetAPI(apis.applyJob).pipe(
      map((resp: any) => {
        let response: any[] = [];
        if (resp) {
          Object.keys(resp).forEach((key) => {
            response.push({ ...resp[key], id: key });
          });
        }
        return response;
      })
    );
  };

  getAppliedJobById = (companyEmail: string) => {
    return this.getAllAppliedJobs().pipe(
      map((resp: any) => {
        return resp.filter((res: any) => res?.companyId === companyEmail);
      }),

      catchError((error) => {
        throw new Error(error);
      })
    );
  };

  deleteAppliedJob = (jobId: string) => {
    return this.callApiService.callDeleteAPI(`job-apply/${jobId}.json`);
  };
}
