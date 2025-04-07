import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RxjsQuestionsService {
  constructor(private readonly _httpClient: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this._httpClient.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }

  getTodos(): Observable<any[]> {
    return this._httpClient.get<any[]>('https://jsonplaceholder.typicode.com/todos/');
  }

  getComments(): Observable<any[]> {
    return this._httpClient.get<any[]>('https://jsonplaceholder.typicode.com/comments');
  }
}
