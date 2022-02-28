import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { InitialConfigStoreService } from '../../data/initial-config-store.service';
import { ListService } from '../../data/list.service';
import { InitialConfig } from '../../model/initial-config';
import { List } from '../../model/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @Input()
  public configs: InitialConfig[] = [];

  public list: List[] = [];

  private _destroyed$ = new Subject<void>();

  constructor(
    private readonly _initialConfigStoreService: InitialConfigStoreService,
    private readonly _listService: ListService
  ) { }

  ngOnInit(): void {
    this._initialConfigStoreService
      .asObservale()
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: (config) => {
          console.log('CONFIG SELECIONADA');
          console.log(config);
          console.log('=============================');
          this._listService
            .asObservale()
            .pipe(
              map((value) =>
                value.filter((value) => value.config === config.config)
              )
            )
            .subscribe({
              next: (list) => {
                this.list = list;
                console.log('LISTA FILTRADA COM BASE NA CONFIG');
                console.log(list);
                console.log('=============================');
              },
            });
        },
      });
  }

  ngOnDestroy(): void {
    console.log('ListComponent ngOnDestroy', this._destroyed$);
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
