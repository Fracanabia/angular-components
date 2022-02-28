import { Observable } from 'rxjs';
import { User } from '../model/user';

export abstract class UserGateway {
  abstract listUser(): Observable<User[]>;
  abstract listUserId(id: number): Observable<User>;
}
