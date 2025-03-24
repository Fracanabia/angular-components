import { Inject, Injectable, LOCALE_ID, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const global: any = window;

const recognition = new (global.SpeechRecognition ||
  global.webkitSpeechRecognition ||
  global.mozSpeechRecognition ||
  global.msSpeechRecognition ||
  global.oSpeechRecognition)();

const speechGrammarList = new (global.SpeechGrammarList ||
  global.webkitSpeechGrammarList)();

@Injectable({
  providedIn: 'root',
})
export class MaviSpeechService {
  private _recognition: any;

  private _isRecording = false;

  private _stopped = false;

  constructor(
    @Inject(LOCALE_ID) private readonly _localeId: string,
    private readonly _ngZone: NgZone
  ) {
    if (recognition) {
      const grammar = `
      #JSGF V1.0;
      grammar comandos;
      public <comando> =
          // Saudações
          Ola MAVI | Olá MAVI | Olá Mavi | olá Mavi | oi MAVI | oi Mavi | oi Mavi | E aí MAVI | E aí Mavi
          | ola mavi | olá mavi | olá mavi | olá mavi | oi mavi | oi mavi | oi mavi | e aí mavi | e aí mavi
;
      `;

      speechGrammarList.addFromString(grammar, 1);
      recognition.grammars = speechGrammarList;
      this._recognition = recognition;
      this._recognition.continuous = false;
      this._recognition.interimResults = true;
      this._recognition.lang = 'pt-BR';
    } else {
      console.error(
        'Este navegador não suporta a API de Reconhecimento de Fala'
      );
    }
  }

  public start(): void {
    if (this._recognition && !this._isRecording) {
      this._recognition.start();
      this._isRecording = true;
      this._stopped = false;
    }
  }

  public stop(): void {
    if (this._recognition && this._isRecording) {
      this._recognition.stop();
      this._isRecording = false;
      this._stopped = true;
    }
  }

  public onResult(callback: (event: any) => void): void {
    if (this._recognition) {
      this._recognition.onresult = (event: any) => {
        if (this._isRecording) {
          this._ngZone.run(() => callback(event));
        }
      };
    }
  }

  public onEnd(callback: (event: any) => void): void {
    if (this._recognition) {
      this._recognition.onend = (event: any) => {
        if (this._isRecording && !this._stopped) {
          this._isRecording = false;
          this._ngZone.run(() => callback(event));
        }
      };
    }
  }
}
