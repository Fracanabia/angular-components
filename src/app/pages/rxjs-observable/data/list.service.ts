import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from '../model/list';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private factoryInitializeList = [
    { item: 'item 1', config: 'config 1' },
    { item: 'item 2', config: 'config 2' },
    { item: 'item 3', config: 'config 3' },
    { item: 'item 4', config: 'config 4' },
    { item: 'item 5', config: 'config 5' },
    { item: 'item 6', config: 'config 1' },
    { item: 'item 7', config: 'config 2' },
    { item: 'item 8', config: 'config 3' },
    { item: 'item 9', config: 'config 4' },
    { item: 'item 10', config: 'config 5' },
    { item: 'item 11', config: 'config 1' },
    { item: 'item 12', config: 'config 2' },
    { item: 'item 13', config: 'config 3' },
    { item: 'item 14', config: 'config 4' },
    { item: 'item 15', config: 'config 5' },
    { item: 'item 16', config: 'config 1' },
    { item: 'item 17', config: 'config 2' },
    { item: 'item 18', config: 'config 3' },
    { item: 'item 19', config: 'config 4' },
    { item: 'item 20', config: 'config 5' },
    { item: 'item 21', config: 'config 1' },
    { item: 'item 22', config: 'config 2' },
    { item: 'item 23', config: 'config 3' },
    { item: 'item 24', config: 'config 4' },
    { item: 'item 25', config: 'config 5' },
  ];

  private _state$ = new BehaviorSubject<List[]>(this.factoryInitializeList);

  asObservale(): Observable<List[]> {
    return this._state$.asObservable();
  }
}
