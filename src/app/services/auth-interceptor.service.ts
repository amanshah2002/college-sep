import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take, catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getUser.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const headers = req.headers.append('Authorization', `Bearer ${user.token}`)
        const authReq = req.clone({headers});
        console.log(authReq);

        return next.handle(authReq).pipe(
          catchError((error) => {
            if (error.status == 401) {
              this.authService.logout();
            }
            throw error;
          })
        );
      })
    );
  }
}
