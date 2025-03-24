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

  processText(text: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const prompt = `
    Você é um assistente que retorna dados no seguinte formato JSON:
    {
      "alergias": [
        {
          "fields": [
            {
              "type": "select",
              "label": "Tipo de Alergia",
              "required": true,
              "name": "tpAlergia",
              "value": "", // Deve ser um dos valores definidos em options e baseado na solicitação.
              "options": ["alimento", "substancia", "outro"],
              "valueChanges": true
            },
            {
              "type": "select",
              "label": "Severidade",
              "required": true,
              "name": "tpSeveridade",
              "value": "", // Deve ser um dos valores definidos em options e baseado na solicitação ou não informado.
              "options": ["não informado", "leve", "media", "alta"]
            },
            {
              "type": "text",
              "label": "Nome da Substância",
              "required": false,
              "name": "nomeSubstancia",
              "value": "", // Somente se tpAlergia for "substancia" trazer preenchido
              "dependsOn": { "field": "tpAlergia", "value": "substancia" }
            },
            {
              "type": "text",
              "label": "Nome do Alimento",
              "required": false,
              "name": "nomeAlimento",
              "value": "", // Somente se tpAlergia for "alimento" trazer preenchido
              "dependsOn": { "field": "tpAlergia", "value": "alimento" }
            },
            {
              "type": "text",
              "label": "Outro",
              "required": false,
              "name": "outraAlergia",
              "value": "", // Somente se tpAlergia for "outro" trazer preenchido
              "dependsOn": { "field": "tpAlergia", "value": "outro" }
            }
          ]
        }
      ]
    }

    ### Regras:
    - Se houver mais de uma alergia mencionada na solicitação, retorne múltiplos objetos dentro do array "alergias".
    - Cada alergia deve conter seu próprio array de "fields".
    - Não inclua texto adicional, apenas o JSON formatado corretamente.

    **Descrição da solicitação:** ${text}
    `;

    const body = {
      model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
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
