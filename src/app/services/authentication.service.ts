import { CompanyService } from './company.service';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { company, loginData } from './../interfaces/interface';
import { CallAPIService } from './../core/call-api-service.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SnacbarService } from './snacbar.service';
import { BehaviorSubject } from 'rxjs';
import { apis } from '../enums/enum.enum';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private callApiService: CallAPIService,
    private snackbarService: SnacbarService,
    private router: Router,
    private http: HttpClient
  ) {}
  baseUrl = environment.baseUrl;
  loginDetails: loginData[] = [];
  loadObservable = new BehaviorSubject<boolean>(false);
  isLoading = this.loadObservable.asObservable();
  user = new BehaviorSubject<loginData>({});
  getUser = this.user.asObservable();
  loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loggedIn.asObservable();

  login = (loginData: loginData, rememberMe: boolean) => {
    this.loadObservable.next(true);

    return this.callApiService.callPostAPI(apis.login, loginData).pipe(tap((data) => {
      this.successfulLogin(data.user, rememberMe);
    }),
    catchError((err) => {
      this.unSuccessfulLogin(err.error.message)
      throw err;
    }))
  };

  signUp = (loginData: any, rememberMe: boolean) => {
    this.loadObservable.next(true);
    const formData = new FormData();
    if(loginData.categoryType.toLowerCase() === 'investor') {
      formData.append('preferredStartupName', loginData.preferredStartupType.label)
      formData.append('preferredStartupValue', loginData.preferredStartupType.value)
      delete loginData['preferredStartupType'];
    }
    Object.keys(loginData).forEach((key) => {
      formData.append(key, loginData[key]);
    });

    return this.http.post(this.baseUrl + apis.signup, formData).pipe(
        tap(() => {
          this.sendEmail(loginData);
          this.loadObservable.next(false);
          this.snackbarService.open('Successfully signed up');
        }),
        catchError((err) => {
          this.loadObservable.next(false);
          this.unSuccessfulLogin(err.error.message)
          throw err;
        }));
  };

  getAllUsers = () => {
    return this.callApiService.callGetAPI(apis.getAllUsers).pipe(
      catchError((err) => {
        this.snackbarService.open(err.error?.message);
        throw err;
      })
    )
  }

  sendEmail = (loginData: loginData) => {
    emailjs
      .send(
        'service_6yspp6l',
        'template_6tlm9r2',
        loginData as any,
        '1zcOXHZVDdsQUjkkk'
      )
      .then(
        (result: EmailJSResponseStatus) => {},
        (error) => {
          this.snackbarService.open(error.text);
        }
      );
  };

  autoLogin = () => {
    const user =
      JSON.parse(sessionStorage.getItem('user') || 'null') ||
      JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      this.user.next(user);
      this.loggedIn.next(true);
    } else {
      this.user.next({});
      this.loggedIn.next(false);
      this.router.navigate(['login']);
    }
  };

  logout = () => {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    this.user.next({});
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  };

  successfulLogin = (flag: any, rememberMe: boolean) => {
    this.snackbarService.open('Logged in successfully');
    this.loadObservable.next(false);
    this.loggedIn.next(true);
    this.user.next(flag);
    rememberMe
      ? localStorage.setItem('user', JSON.stringify(flag))
      : sessionStorage.setItem('user', JSON.stringify(flag));
    this.router.navigate(['startups']);
    return;
  };

  unSuccessfulLogin = (message: string) => {
    console.log('err msg:', message);
    this.snackbarService.open(message);
    this.loadObservable.next(false);
    this.loggedIn.next(false);
    return;
  };
}
