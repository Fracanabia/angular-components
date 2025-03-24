import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RecordService } from './record.service';
import { WebSocketService } from './websocket.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent {
  recording = false;
  audioUrl: string | null = null;
  private audioChunks: Blob[] = [];
  audios: SafeUrl[] = []; // Array para armazenar os URLs dos áudios

  constructor(
    private recordService: RecordService,
    private webSocketService: WebSocketService,
    private sanitizer: DomSanitizer
  ) {}

  async startRecording() {
    this.audioChunks = []; // Limpa os chunks anteriores
    this.recording = true; // Define que a gravação começou

    this.webSocketService.connect('wss://echo.websocket.org');

    // Chama o método de start do serviço, que agora aceita um callback
    await this.recordService.startRecording(async (chunk) => {
      const audioUrl = this.recordService.createAudioUrl(chunk);
      const safeUrl = this.sanitizer.bypassSecurityTrustUrl(audioUrl);

      // Verifica se o chunk tem áudio
      const hasAudio = await this.recordService.validateAudioChunk(chunk);
      if (hasAudio) {
        console.log('Novo chunk de áudio:', audioUrl);
        this.webSocketService.sendMessage(audioUrl);
        // Adiciona o novo áudio à lista
        this.audios.push(safeUrl);
        this.audioChunks.push(chunk); // Adiciona o novo chunk ao array
      } else {
        console.log('Chunk de áudio vazio ou mudo.');
      }
    });
  }

  async stopRecording() {
    this.recordService.stopRecording();
    this.webSocketService.close();
    this.recording = false;
  }
}
