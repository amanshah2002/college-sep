
import { map } from 'rxjs/operators';
import { loginData } from './../interfaces/interface';
import { CallAPIService } from './../core/call-api-service.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SnacbarService } from './snacbar.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private callApiService: CallAPIService,
    private snackbarService: SnacbarService
  ) {}
  baseUrl = environment.baseUrl;
  loginDetails: loginData[] = [];
  loadObservable = new BehaviorSubject<boolean>(false);
  isLoading = this.loadObservable.asObservable();

  login = (loginData: loginData) => {
    this.loadObservable.next(true);
    let flag:any = null;
    this.getLoginData().subscribe((data) => {
        console.log(data);
        data.map((user: loginData) => {
          user.email.toLowerCase() == loginData.email.toLowerCase() && user.type.toLowerCase() == loginData.type.toLowerCase()
            ? (flag = user)
            : null;
        });

        if (flag) {
          if(flag.password == loginData.password){
            this.snackbarService.open('Logged in successfully')
            this.loadObservable.next(false);
            return
          }else{
            this.snackbarService.open('Email or password is incorrect');
            this.loadObservable.next(false);
            return
          }
        } else {
          this.snackbarService.open('User does not exist, please sign up first');
          this.loadObservable.next(false);
        }
    });
  };

  signUp = (loginData:loginData) => {
    this.loadObservable.next(true);
    let flag = 0;
    this.getLoginData().subscribe((data) => {
        console.log(data);
        data.map((user: loginData) => {
          user.email.toLowerCase() == loginData.email.toLowerCase()
            ? (flag = 1)
            : null;
        });

        if (flag == 1) {
          this.snackbarService.open('A user with this email already exists!')
          this.loadObservable.next(false);
        } else {
          this.callApiService.callPostAPI('authenticate.json',loginData).subscribe(data => {
            console.log(data);
            this.snackbarService.open('Successfully signed up')
            this.loadObservable.next(false);
          })
        }
    });
  }

  getLoginData = () => {
    this.loginDetails = [];
    return this.callApiService.callGetAPI('authenticate.json').pipe(
      map((data) => {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            this.loginDetails.push({ ...data[key], id: key });
          }
        }
        return this.loginDetails;
      })
    );
  };
}
