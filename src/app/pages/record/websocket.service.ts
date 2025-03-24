import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements OnDestroy {
  private socket!: WebSocket;
  private messageSubject = new Subject<any>(); // Mensagens recebidas
  private isConnectedSubject = new ReplaySubject<boolean>(1); // Estado da conexão

  constructor() {}

  /**
   * Conecta ao WebSocket
   * @param url URL do WebSocket (wss:// ou ws://)
   */
  connect(url: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.warn('WebSocket já está conectado.');
      return;
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('WebSocket conectado:', url);
      this.isConnectedSubject.next(true);
    };

    this.socket.onmessage = (event) => {
      console.log('Mensagem recebida:', event.data);

      let parsedData: any;

      try {
        parsedData = JSON.parse(event.data);
      } catch (error) {
        console.warn('Mensagem recebida não é JSON válido:', event.data);
        parsedData = event.data; // Retorna a mensagem original caso não seja JSON
      }

      this.messageSubject.next(parsedData);
    };


    this.socket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };

    this.socket.onclose = () => {
      console.warn('WebSocket desconectado.');
      this.isConnectedSubject.next(false);
    };
  }

  /**
   * Envia dados para o WebSocket
   * @param data Dados a serem enviados
   */
  sendMessage(data: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket não está conectado. Mensagem não enviada.');
    }
  }

  /**
   * Obtém um Observable para ouvir mensagens recebidas do WebSocket
   */
  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  /**
   * Obtém um Observable para verificar o status da conexão
   */
  getConnectionStatus(): Observable<boolean> {
    return this.isConnectedSubject.asObservable();
  }

  /**
   * Fecha a conexão WebSocket
   */
  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  /**
   * Garante que a conexão será fechada ao destruir o serviço
   */
  ngOnDestroy(): void {
    this.close();
  }
}
