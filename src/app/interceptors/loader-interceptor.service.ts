import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptorService implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private loader: LoaderService) {}

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    this.loader.isLoading.next(this.requests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loader.isLoading.next(true);
    return Observable.create((observer) => {
      const subscription = next.handle(req).subscribe((event) => {
        if (event instanceof HttpResponse) {
          this.removeRequest(req);
          observer.next(event);
        }
      },
      err=>{
        alert("Something Is Wrong.."+ err);
        console.log(err);
        this.removeRequest(req);
        observer.error(err);
      },
      ()=>{
        this.removeRequest(req);
        observer.complete();
      }
      );
      //remove request from queue when cancelled
      return ()=>{
        this.removeRequest(req);
        subscription.unsubscribe();
      } 
    });
  }
}
