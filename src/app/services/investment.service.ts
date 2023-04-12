import { investmentDetails } from './../interfaces/interface';
import { Injectable } from '@angular/core';
import { Observable, tap, map, of } from 'rxjs';
import { CallAPIService } from '../core/call-api-service.service';
import { apis } from '../enums/enum.enum';

export interface investmentResponse {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private callApiService: CallAPIService) { }

   public invest = (investmentDetails: investmentDetails): Observable<any> => {
    return this.callApiService.callPostAPI(apis.invest, investmentDetails)
  };

 public getInvestments = (): Observable<any> => {
  return this.callApiService.callGetAPI(apis.invest).pipe(
    map((data: investmentDetails) => {
      return this.flattenInvestmentResponse(data)
    })
  )
  }

  public flattenInvestmentResponse = (investmentRes: any): investmentDetails[] & investmentResponse[] => {
    let flattenedResponse: investmentDetails[] & investmentResponse[] = []
    Object.keys(investmentRes).forEach((key: any) => {
      flattenedResponse.push({
        ...investmentRes[key], id: key
      })
    });

    return flattenedResponse;
  }
}
