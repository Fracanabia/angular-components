import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { finalize, Observable, takeUntil } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router, private readonly _loaderService: LoaderService) {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        this._loaderService.cancelPendingRequests();
      }
  });

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loaderService.show();
    return next.handle(req).pipe(
      takeUntil(this._loaderService.onCancelPendingRequests()),
      finalize(() => {
        this._loaderService.hide();
      }));
  }

}
