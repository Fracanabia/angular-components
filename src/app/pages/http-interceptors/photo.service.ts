import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private readonly _httpClient: HttpClient) { }

  getPhotos(): Observable<any> {
    return this._httpClient.get('https://jsonplaceholder.typicode.com/photos');
  }

}
