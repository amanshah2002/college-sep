import { CompanyService } from './company.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { company, loginData } from './../interfaces/interface';
import { CallAPIService } from './../core/call-api-service.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SnacbarService } from './snacbar.service';
import { BehaviorSubject } from 'rxjs';
import { apis } from '../enums/enum.enum';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private callApiService: CallAPIService,
    private snackbarService: SnacbarService,
    private router: Router,
    private companyService: CompanyService
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
    let flag: any = null;

    if (loginData.categoryType != 'Company') {
      this.getLoginData().subscribe((data) => {
        console.log(data);
        data?.map((user: loginData) => {
          user?.email?.toLowerCase() == loginData.email?.toLowerCase() &&
          (user?.categoryType?.toLowerCase() == loginData.categoryType?.toLowerCase() || user?.categoryType?.toLowerCase() === 'admin')
            ? (flag = user)
            : null;
        });

        if (flag) {
          if (flag.password == loginData.password) {
            this.successfulLogin(flag,rememberMe);
          } else {
            this.unSuccessfulLogin('Email or password is incorrect');
            return;
          }
        } else {
         this.unSuccessfulLogin('User does not exist, please sign up first or edit your role');
        }
      });
    } else {
      this.companyService.getCompanies().subscribe((data) => {
        data.map((company: company) => {
          company.email.toLowerCase() == loginData.email?.toLowerCase()
            ? (flag = company)
            : null;
        });

        if (flag) {
          if (flag.password == loginData.password) {
           this.successfulLogin(flag,rememberMe);
          } else {
         this.unSuccessfulLogin('Email or password is incorrect');
            return;
          }
        } else {
          this.snackbarService.open(
            'Company does not exist, please sign up first'
          );
          this.loadObservable.next(false);
        }
      });
    }
  };

  signUp = (loginData: loginData, rememberMe: boolean) => {
    let loginArray: any[] = [];
    this.loadObservable.next(true);
    let flag = 0;
    this.getLoginData().subscribe((data) => {
      data? loginArray = data : null;
      data?.map((user: loginData) => {
        if(user){
          user.email?.toLowerCase() == loginData.email?.toLowerCase()
            ? (flag = 1)
            : null;
        }
      });

      if (flag == 1) {
        this.snackbarService.open('A user with this email already exists!');
        this.loadObservable.next(false);
      } else {
        loginArray.push(loginData);
        this.callApiService
          .callPutAPI(apis.authenticateApi, {}, loginArray)
          .subscribe((data) => {
            console.log(data);
            loginData['resume'] = '';
            this.sendEmail(loginData);
            this.snackbarService.open('Successfully signed up');
            this.loadObservable.next(false);
            this.user.next(loginData);
            rememberMe
              ? localStorage.setItem('user', JSON.stringify(flag))
              : sessionStorage.setItem('user', JSON.stringify(flag));
            this.loggedIn.next(true);
            this.router.navigate(['startups']);
          });
      }
    });
  };

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

  getLoginData = () => {
    this.loginDetails = [];
    return this.callApiService.callGetAPI(apis.authenticateApi).pipe(
      map((data) => {
        data.forEach((resp: any) => {
          resp?
          this.loginDetails.push(resp) :
          null
        })
        return this.loginDetails;
      })
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

  successfulLogin = (flag: any,rememberMe:boolean) => {
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


  unSuccessfulLogin = (message:string) => {
    this.snackbarService.open(message);
    this.loadObservable.next(false);
    this.loggedIn.next(false);
    return;
  }
}
