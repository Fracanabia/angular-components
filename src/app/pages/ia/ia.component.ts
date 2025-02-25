import { Component } from '@angular/core';
import { ChatMessage } from './chat-message.model';
import { IaService } from './ia.service';

@Component({
  selector: 'app-ia',
  templateUrl: './ia.component.html',
  styleUrls: ['./ia.component.scss']
})
export class IaComponent {
  messages: ChatMessage[] = [];  // Array para armazenar as mensagens
  userInput: string = '';        // Texto digitado pelo usuário
  carregando = false;            // Estado de carregamento

  constructor(private iaService: IaService) {}

  enviarMensagem() {
    if (!this.userInput.trim()) return; // Evita enviar mensagens vazias

    // Adiciona a mensagem do usuário ao chat
    this.messages.push({ role: 'user', content: this.userInput });

    const pergunta = this.userInput; // Salva o texto para enviar à IA
    this.userInput = ''; // Limpa o input
    this.carregando = true;

    this.iaService.processText(pergunta).subscribe({
      next: (res) => {
        const respostaIa = res.choices[0].message.content;

        // Adiciona a resposta da IA ao chat
        this.messages.push({ role: 'assistant', content: respostaIa });

        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao chamar IA:', err);
        this.carregando = false;
      }
    });
  }
}
