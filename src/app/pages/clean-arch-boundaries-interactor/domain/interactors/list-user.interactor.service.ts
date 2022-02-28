import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGateway } from '../boundaries/user.gateway';
import { Execute } from '../execute/execute';
import { User } from '../model/user';

@Injectable()
export class ListUserInteractorService implements Execute<Observable<User[]>> {
  constructor(private readonly _userGatewayService: UserGateway) {}

  execute(): Observable<User[]> {
    return this._userGatewayService.listUser();
  }
}
