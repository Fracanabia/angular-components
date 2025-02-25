import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IaService {
  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions'; // Endpoint do OpenRouter
  private apiKey = environment.iaKey; // 🚨 Sua API Key do OpenRouter

  constructor(private http: HttpClient) {}

  processText(text: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`, // Inclui a API Key
      'HTTP-Referer': 'https://seusite.com', // Substitua pelo domínio autorizado no OpenRouter
    });

    const body = {
      model: 'mistralai/mistral-saba', // Modelo de IA (pode ser substituído)
      messages: [
        { role: 'system', content: 'Você é um assistente especializado em estruturar dados.' },
        { role: 'user', content: text }
      ],
      temperature: 0.7, // Ajuste de criatividade
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
