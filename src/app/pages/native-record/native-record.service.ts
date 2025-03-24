import { Inject, Injectable, LOCALE_ID, NgZone } from '@angular/core';

const global: any = window;
const recognition = new (global.SpeechRecognition ||
  global.webkitSpeechRecognition ||
  global.mozSpeechRecognition ||
  global.msSpeechRecognition ||
  global.oSpeechRecognition)();

@Injectable({
  providedIn: 'root',
})
export class NativeRecordService {
  private recognition: any;
  private isListening = false;
  private stopped = false;

  constructor(@Inject(LOCALE_ID) private readonly _localeId: string, private readonly _ngZone: NgZone) {
    if (recognition) {
       this.recognition = recognition;
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'pt-BR';
    } else {
      console.error('Este navegador não suporta a API de Reconhecimento de Fala');
    }
  }

  public startRecognition(): void {
    if (this.recognition && !this.isListening) {
      this.recognition.start();
      this.isListening = true;
      this.stopped = false;
    }
  }

  public stopRecognition(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      this.stopped = true;
    }
  }

  public onResult(callback: (event: any) => void): void {
    if (this.recognition) {
      this.recognition.onresult = (event: any) => {
        if (this.isListening) {
          this._ngZone.run(() => callback(event));
        }
      };
    }
  }

  public onEnd(callback: (event: any) => void): void {
    if (this.recognition) {
      this.recognition.onend = (event: any) => {
        if (this.isListening && !this.stopped) {
          this.isListening = false;
          this._ngZone.run(() => callback(event));
        }
      };
    }
  }
}
