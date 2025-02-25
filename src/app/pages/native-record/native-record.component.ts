import { Component, OnInit } from '@angular/core';
import { NativeRecordService } from './native-record.service';

@Component({
  selector: 'app-native-record',
  templateUrl: './native-record.component.html',
  styleUrls: ['./native-record.component.scss'],
})
export class NativeRecordComponent implements OnInit {
  transcribedText = '';
  selectedLanguage = 'pt-BR';

  constructor(private nativeRecordService: NativeRecordService) {}

  ngOnInit() {
    this._setupResultHandler();
    this._setupErrorHandler();
  }

  private _setupResultHandler() {
    let silenceTimeout: ReturnType<typeof setTimeout>;

    this.nativeRecordService.onResult((event: any) => {
      clearTimeout(silenceTimeout);

      const { results, resultIndex } = event;
      let recognized = '';

      for (let i = resultIndex; i < results.length; ++i) {

      if (results[i].isFinal) {
        recognized += (results[i][0].transcript as string).toLowerCase().trim();
      }

      silenceTimeout = setTimeout(() => {
        console.log("Nenhum áudio recebido por 10 segundos. Considerando fim da fala.");
    }, 10000);
    }
    });
  }

  private _setupErrorHandler(): void {
    this.nativeRecordService.onEnd((event) => {
      console.log(event)
      this.startRecognition();
    });
  }

  public startRecognition() {
    this.nativeRecordService.startRecognition();
  }

  public stopRecognition() {
    this.nativeRecordService.stopRecognition();

  }
}
