import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { User } from '../domain/model/user';

@Injectable()
export class UserRepositoryService {
  private MOCK_USER: User[] = [
    {
      id: 1,
      name: 'wesley',
      email: 'wesley@email.com.br',
    },
    {
      id: 2,
      name: 'anapaula',
      email: 'anapaula@email.com.br',
    },
  ];

  private _user$ = new BehaviorSubject<User[]>(this.MOCK_USER);

  listUser(): Observable<User[]> {
    return this._user$;
  }

  listUserId(id: number) {
    return this._user$.pipe(
      switchMap((users) => users.filter((user) => user.id === id))
    );
  }
}
