import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InitialConfig } from '../model/initial-config';

@Injectable({
  providedIn: 'root',
})
export class InitialConfigStoreService {
  private _state$ = new BehaviorSubject<InitialConfig>({} as InitialConfig);

  asObservale(): Observable<InitialConfig> {
    return this._state$.asObservable();
  }

  set(value: InitialConfig): void {
    return this._state$.next(value);
  }
}
