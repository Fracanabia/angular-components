import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGateway } from '../domain/boundaries/user.gateway';
import { User } from '../domain/model/user';
import { UserRepositoryService } from './user.repository.service';

@Injectable()
export class UserAdapterService implements UserGateway {
  constructor(private readonly _userRepositoryService: UserRepositoryService) {}

  listUser(): Observable<User[]> {
    return this._userRepositoryService.listUser();
  }

  listUserId(id: number): Observable<User> {
    return this._userRepositoryService.listUserId(id);
  }
}
