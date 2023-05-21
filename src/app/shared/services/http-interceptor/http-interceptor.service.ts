import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('HttpInterceptor', req);
    // $('.preloader').attr("style", "display:flex;");
    return next.handle(req).pipe(map((event: any) => {
      // console.log('HttpInterceptorService', event);
      if (event.status != undefined) {
        // $('.preloader').attr("style", "display:none;");
      }
      return event;
    }), catchError((error: any) => {
      // $('.preloader').attr("style", "display:none;");
      // console.log('HttpInterceptorService', error);
      return throwError(error);
    })
    );
  }
}
