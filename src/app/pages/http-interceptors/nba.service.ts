import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  constructor(private readonly _httpClient: HttpClient) { }

  getPlayers(): Observable<any> {
    return this._httpClient.get('https://www.balldontlie.io/api/v1/players').pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }

  getTeams(): Observable<any> {
    return this._httpClient.get('https://www.balldontlie.io/api/v1/teams').pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }
}
