import { Component } from '@angular/core';
import { RecordService } from './record.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent {
  recording = false;
  audioUrl: string | null = null;
  private audioChunks: Blob[] = [];
  audios: string[] = [];  // Array para armazenar os URLs dos áudios

  constructor(private recordService: RecordService) {}

  async startRecording() {
    this.audioChunks = [];  // Limpa os chunks anteriores
    this.recording = true;   // Define que a gravação começou

    // Chama o método de start do serviço, que agora aceita um callback
    await this.recordService.startRecording((chunk) => {
      const audioUrl = this.recordService.createAudioUrl(chunk);
      console.log('Novo chunk de áudio:', audioUrl);
      // Adiciona o novo áudio à lista
      this.audios.push(audioUrl);
      this.audioChunks.push(chunk);  // Adiciona o novo chunk ao array
    });
  }

  async stopRecording() {
    const blob = await this.recordService.stopRecording();
    if (blob) {
      const audioUrl = this.recordService.createAudioUrl(blob);
      this.audios.push(audioUrl);  // Adiciona o áudio final ao array
    }
    this.recording = false;
  }
}
