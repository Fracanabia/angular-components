import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FormField } from '../../components/custom-form/custom-form.component';

export interface Module {
  id: number;
  moduleName: string;
}

export interface Profile {
  id: number;
  profileName: string;
  modules: Module[];
}

interface ApiResponse {
  content: Profile[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface MediaSchema {
  id?: number; // corresponde ao CD_MEDIA_SCHEMA
  profileModuleId: number; // corresponde ao CD_PERFIL_MODULO
  module: string; // corresponde ao CD_MODULO
  schema: string | FormField; // corresponde ao SCHEMA
  schemaProvider: string; // corresponde ao SCHEMA_PROVIDER
}

@Injectable({
  providedIn: 'root',
})
export class MvService {
  private API_URL = 'https://api.marcelostuelher.tech';

  constructor(private readonly _httpClient: HttpClient) {}

  searchProfiles(
    query: string,
    page: number = 1,
    size: number = 10
  ): Observable<{ profiles: Profile[]; totalPages: number }> {
    return this._httpClient
      .get<ApiResponse>(`${this.API_URL}/schema-ia/media-schema/profiles`, {
        params: {
          profileName: query,
          page: page.toString(),
          size: size.toString(),
        },
      })
      .pipe(
        map((response) => ({
          profiles: response.content,
          totalPages: response.totalPages,
        }))
      );
  }

  createSchemaByModule(data: MediaSchema): Observable<MediaSchema> {
    return this._httpClient.post<MediaSchema>(
      `${this.API_URL}/schema-ia/media-schema/create-schema`,
      data
    );
  }
}
