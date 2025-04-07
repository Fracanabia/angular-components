import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Profile {
  id: number;
  profileName: string;
  modules: { id: number; moduleName: string }[];
}

interface ApiResponse {
  content: Profile[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class MvService {
  private API_URL = 'https://api.marcelostuelher.tech';

  constructor(private readonly _httpClient: HttpClient) {}

  searchProfiles(query: string, page: number = 1, size: number = 10): Observable<{ profiles: Profile[]; totalPages: number }> {
    return this._httpClient.get<ApiResponse>(
      `${this.API_URL}/schema-ia/media-schema/profiles`,
      {
        params: {
          profileName: query,
          page: page.toString(),
          size: size.toString(),
        },
      }).pipe(
        map(response => ({
          profiles: response.content,
          totalPages: response.totalPages
        }))
      );
  }
}
