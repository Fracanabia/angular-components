import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InitialConfig } from '../model/initial-config';

@Injectable({
  providedIn: 'root',
})
export class InitialConfigService {
  private factoryInitializeConfig = [
    { config: 'config 1' },
    { config: 'config 2' },
    { config: 'config 3' },
    { config: 'config 4' },
    { config: 'config 5' },
  ];

  private _state$ = new BehaviorSubject<InitialConfig[]>(
    this.factoryInitializeConfig
  );

  asObservale(): Observable<InitialConfig[]> {
    return this._state$.asObservable();
  }
}
