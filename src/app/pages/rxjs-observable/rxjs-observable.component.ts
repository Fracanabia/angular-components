import {Component, OnDestroy, OnInit} from '@angular/core';
import {delay, Subject, takeUntil} from 'rxjs';
import {InitialConfigStoreService} from './data/initial-config-store.service';
import {InitialConfigService} from './data/initial-config.service';
import {InitialConfig} from './model/initial-config';

@Component({
  selector: 'app-rxjs-observable',
  templateUrl: './rxjs-observable.component.html',
  styleUrls: ['./rxjs-observable.component.scss'],
})
export class RxjsObservableComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject<void>();

  public configs: InitialConfig[] = [];

  constructor(
    private readonly _initialConfigService: InitialConfigService,
    private readonly _initialConfigStoreService: InitialConfigStoreService
  ) {}

  ngOnInit(): void {
    this._initialConfigService
      .asObservale()
      .pipe(delay(2000), takeUntil(this._destroyed$))
      .subscribe({
        next: (value) => {
          console.log('CRIANDO LISTA DE CONFIG PARA SELECIONAR');
          console.log('=============================');
          this.configs = value;
          this._initialConfigStoreService.set(value[0]);
        },
      });
  }

  ngOnDestroy(): void {
    console.log('RxjsObservableComponent ngOnDestroy', this._destroyed$);
    this._destroyed$.next();
    this._destroyed$.complete();    
  }
}
