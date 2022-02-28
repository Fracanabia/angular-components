import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGateway } from '../boundaries/user.gateway';
import { Execute } from '../execute/execute';
import { User } from '../model/user';

@Injectable()
export class ListUserIdInteractorService implements Execute<Observable<User>> {
  constructor(private readonly _userGatewayService: UserGateway) {}

  execute(id: number): Observable<User> {
    return this._userGatewayService.listUserId(id);
  }
}
