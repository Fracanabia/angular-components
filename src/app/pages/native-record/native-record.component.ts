import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { NativeRecordService } from './native-record.service';

@Component({
  selector: 'app-native-record',
  templateUrl: './native-record.component.html',
  styleUrls: ['./native-record.component.scss'],
})
export class NativeRecordComponent implements OnInit {
  public recognizedText: string = ''; // Texto confirmado

  public recognizingText: string = ''; // Texto em tempo real (não finalizado)

  @Output() public recognizedTextEmitter = new EventEmitter<string>();

  constructor(
    private readonly _nativeRecordService: NativeRecordService,
    private readonly _ngZone: NgZone
  ) {}

  ngOnInit() {
    this._setupResultHandler();
    this._setupErrorHandler();
  }

  private _setupResultHandler() {
    let silenceTimeout: ReturnType<typeof setTimeout>;

    this._nativeRecordService.onResult((event: any) => {
      clearTimeout(silenceTimeout);

      const { results, resultIndex } = event;

      let temporaryRecognizing = '';

      for (let i = resultIndex; i < results.length; ++i) {
        const transcript = results[i][0].transcript.toLowerCase().trim();

        if (results[i].isFinal) {
          // Se for finalizado, move para recognizedText e limpa recognizingText
          this.recognizedText += transcript + ' ';
          this.recognizingText = '';
        } else {
          // Se ainda estiver sendo reconhecido, atualiza recognizingText
          temporaryRecognizing = transcript;
        }
      }

      // Atualiza recognizingText com a última transcrição parcial
      this.recognizingText = temporaryRecognizing;
      this.recognizedTextEmitter.emit(this.recognizedText);

      // Define timeout para detectar silêncio e encerrar o reconhecimento
      silenceTimeout = setTimeout(() => {
        console.log("Nenhum áudio recebido por 10 segundos. Considerando fim da fala.");
      }, 10000);
    });
  }

  private _setupErrorHandler(): void {
    this._nativeRecordService.onEnd((event) => {
      console.log(event);
      this.startRecognition();
    });
  }

  public startRecognition() {
    this._nativeRecordService.startRecognition();
  }

  public stopRecognition() {
    this._nativeRecordService.stopRecognition();
  }

  public clearRecognizedText() {
    this.recognizedText = '';
    this.recognizedTextEmitter.emit(this.recognizedText);
  }
}
