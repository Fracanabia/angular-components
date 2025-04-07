import { Component } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { RxjsQuestionsService } from './rxjs-questions.service';

@Component({
  selector: 'app-rxjs-questions',
  templateUrl: './rxjs-questions.component.html',
  styleUrls: ['./rxjs-questions.component.scss'],
})
export class RxjsQuestionsComponent {
  constructor(private readonly _rxjsQuestionsService: RxjsQuestionsService) {}

  getUsers = (): Observable<any[]> => {
    return this._rxjsQuestionsService.getUsers();
  };

  getTodos = (): Observable<any[]> => {
    return this._rxjsQuestionsService.getTodos();
  };

  getComments = (): Observable<any[]> => {
    return this._rxjsQuestionsService.getComments();
  };

  getObservable = ({ search }: { search: string }): Observable<any[]> => {
    return this._rxjsQuestionsService.getUsers().pipe(
      tap(() => console.log(search)),
      map((users) => users.filter((user) => user.name.includes(search))),
      map((users) => users.map((user) => user.id)),
      switchMap(() => this._rxjsQuestionsService.getTodos())
    );
  };
}
