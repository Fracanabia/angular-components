import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, firstValueFrom } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  MaidaAuthorizationToken,
  MaidaAuthorizationTokenResponse,
} from '../domain/models/maida-authorization-token';

@Injectable()
export class MaidaRepository {
  private readonly maidaDomain = 'devmedai.mv.com.br';
  private readonly systemId = 'mvpep';

  constructor(private readonly _http: HttpClient) {}

  /**
   * Obtém o token de autorização da Maida API.
   * @returns {Observable<MaidaAuthorizationToken>} Observable que emite o token de autorização obtido.
   */
  getAuthorizationToken(): Observable<MaidaAuthorizationToken> {
    const url = `https://${this.maidaDomain}/token`;

    return this.getAuthParams().pipe(
      switchMap((params) =>
        this._http.post<MaidaAuthorizationTokenResponse>(url, params, {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        })
      ),
      map((response) => new MaidaAuthorizationToken(response))
    );
  }

  /**
   * Obtém os parâmetros de autenticação dinamicamente.
   */
  private getAuthParams(): Observable<string> {
    const params = {
      grant_type: '',
      username: 'pep_pbh',
      password: '123mv',
      scope: '',
      client_id: '',
      client_secret: '',
    };

    // Usa of() do RxJS para evitar criar manualmente um Observable
    return of(new HttpParams({ fromObject: params }).toString());
  }

  async setupSocketConnection(cnpj: string): Promise<URL> {
    const token = await firstValueFrom(this.getAuthorizationToken());
    const url = new URL(`wss://${this.maidaDomain}/ws_pep/stream_audio`);

    const params = new Map<string, string>([
      ['cnpj', cnpj],
      ['appointment_id', ''],
      ['language', 'pt-BR'],
      ['system_id', this.systemId],
      ['token', token?.accessToken || ''],
    ]);

    params.forEach((value, key) => {
      url.searchParams.append(key, value);
    });

    return url;
  }
}
