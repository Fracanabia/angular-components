import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  constructor() { }

  private isLoading$ = new Subject<boolean>();

  private pendingHTTPRequests$ = new Subject<void>();

  public show(): void {
    this.isLoading$.next(true);
  }

  public hide(): void {
    this.isLoading$.next(false);
  }

  public onIsLoading() {
    return this.isLoading$.asObservable();
  }

  public cancelPendingRequests() {
    this.pendingHTTPRequests$.next();
  }

  public onCancelPendingRequests() {
    return this.pendingHTTPRequests$.asObservable();
  }
}
