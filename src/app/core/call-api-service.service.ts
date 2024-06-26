import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CallAPIService {
  baseUrl: string = environment.baseUrl;

  public headers = new HttpHeaders();

  constructor(private http: HttpClient, public router: Router) { }

  public setHeaders() {
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
    });
  }

  public callGetAPI(url:any, paramsObject?:any) {
    this.setHeaders();
    const params = this.getHttpParams(paramsObject);
    return this.http
      .get(this.baseUrl + url, { headers: this.headers, params })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  public callPostAPI(url:any, data:any, id?:any) {
    this.setHeaders();
    return this.http
      .post(this.baseUrl + url, data, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }

  public callDeleteAPI(url:any) {
    this.setHeaders();
    return this.http.delete(this.baseUrl + url, { headers: this.headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public callPutAPI(url:any, paramsObject?:any, data?:any) {
    this.setHeaders();
    const params = this.getHttpParams(paramsObject);
    return this.http
      .put(this.baseUrl + url, data, { headers: this.headers, params })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  private getHttpParams(object?: any): HttpParams {
    let params: HttpParams = new HttpParams();
    if (object) {
      Object.keys(object).map((key) => {
        params = params.set(key, object[key]);
      });
    }
    return params;
  }

  public callGetCSVAPI(url:any, paramsObject?:any) {
    let headers = new HttpHeaders({
      Accept: 'application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet'
    });

    const params = this.getHttpParams(paramsObject);

    return this.http
      .get(this.baseUrl + url, { headers, params, responseType: "arrayBuffer" as any })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  public callGetPdfAPI(url:any, paramsObject?:any) {
    let headers = new HttpHeaders({
      Accept: 'application/pdf'
    });

    const params = this.getHttpParams(paramsObject);

    return this.http
      .get(this.baseUrl + url, { headers, params, responseType: "arrayBuffer" as 'json' })
      .pipe(
        map((response: any) => {
          return response;
        }),
        tap(data => {

        })
      );
  }
}
