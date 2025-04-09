import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IaService {
  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions'; // Endpoint do OpenRouter
  private apiKey = environment.iaKey; // 🚨 Sua API Key do OpenRouter

  constructor(private http: HttpClient) {}

  processText(text: string, schema: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const prompt = `
    Você é um assistente que retorna dados no seguinte formato JSON com base no schema fornecido.:
    ${schema}

    ### Regras:
    - Respeite as regras definidas em rules definidos no schema.
    - Não alterar o schema fornecido.

    **Descrição da solicitação:** ${text}
    `;

    const body = {
      model: 'meta-llama/llama-4-maverick:free',
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente que retorna dados em formatos JSON pré-definidos.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map((response) => {
        // Extrai o conteúdo da resposta
        const content = response.choices[0].message.content;

        try {
          // Tenta remover a formatação Markdown (caso exista)
          const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
          const jsonString = jsonMatch ? jsonMatch[1] : content;

          // Converte a string JSON para um objeto
          return {
            content,
            schema: JSON.parse(jsonString),
          };
        } catch (error) {
          console.error('Erro ao converter resposta da IA:', error);
          return null;
        }
      })
    );
  }
}
