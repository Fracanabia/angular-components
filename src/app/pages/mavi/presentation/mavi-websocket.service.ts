import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaviWebsocketService {
  private _socket: WebSocket | null = null;

  private _messageSubject = new Subject<any>();

  constructor() {}

  public connect(url: URL): void {
    this._socket = new WebSocket(url.toString());

    this._socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this._socket.onmessage = (event) => {
      this._messageSubject.next(event.data);
    };

    this._socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this._socket.onerror = (error) => {
      this._messageSubject.error(error);
      console.error('WebSocket connection error', error);
    };
  }

  public sendMessage(message: string | ArrayBuffer): void {
    if (this._socket && this._socket.readyState === WebSocket.OPEN) {
      this._socket.send(message);
    }
  }

  public getMessages(): Observable<any> {
    return this._messageSubject.asObservable();
  }

  public disconnect() {
    if (this._socket) {
      this._socket.close();
    }
  }
}
