import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListUserIdInteractorService } from '../../domain/interactors/list-user-id.interactor.service';
import { ListUserInteractorService } from '../../domain/interactors/list-user.interactor.service';
import { User } from '../../domain/model/user';

@Injectable()
export class UserPresenterService {
  constructor(
    private readonly _listUserInteractorService: ListUserInteractorService,
    private readonly _listUserIdInteractorService: ListUserIdInteractorService
  ) {}

  listUser(): Observable<User[]> {
    return this._listUserInteractorService.execute();
  }

  listUserId(id: number): Observable<User> {
    return this._listUserIdInteractorService.execute(id);
  }
}
