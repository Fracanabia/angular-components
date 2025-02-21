import { Injectable } from '@angular/core';
import { RecordRTCPromisesHandler } from 'recordrtc';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private recorder!: RecordRTCPromisesHandler;
  private stream!: MediaStream;
  private audioChunks: Blob[] = [];  // Array para armazenar os pedaços de áudio

  constructor() {}

  // Inicia a gravação e executa um callback com cada novo chunk de áudio
  async startRecording(callback: (chunk: Blob) => void) {
    console.log('[RecordService] Iniciando gravação...');
    this.audioChunks = [];  // Limpa os chunks anteriores

    // Solicita permissão para acessar o microfone
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Cria o gravador de áudio
    this.recorder = new RecordRTCPromisesHandler(this.stream, {
      type: 'audio',
      mimeType: 'audio/webm',
      timeSlice: 1000,  // A cada 1 segundo
      audioBitsPerSecond: 32000,  // Reduz a taxa de bits para 32 kbps
      sampleRate: 8000,  // Reduz a taxa de amostragem para 8 kHz (qualidade mais baixa)
      numberOfAudioChannels: 1,  // Gravação em mono (reduz a qualidade)
      bufferSize: 8192,  // Reduz o tamanho do buffer, o que pode ajudar a diminuir o uso de recursos
      ondataavailable: (blob) => {
        console.log('[RecordService] Novo chunk de áudio:', blob);
        this.audioChunks.push(blob);  // Armazena o chunk
        callback(blob);  // Passa o chunk para o callback
      },
    });

    // Inicia a gravação
    await this.recorder.startRecording();
  }

  // Para a gravação e retorna o blob completo
  async stopRecording(): Promise<Blob | null> {
    console.log('[RecordService] Parando gravação...');
    await this.recorder.stopRecording();

    // Interrompe a captura de áudio
    this.stream.getTracks().forEach((track) => track.stop());

    // Retorna o áudio completo como um Blob
    if (this.audioChunks.length > 0) {
      return new Blob(this.audioChunks, { type: 'audio/webm' });
    } else {
      console.warn('[RecordService] Nenhum áudio gravado.');
      return null;
    }
  }

  // Método para criar a URL do áudio gravado
  createAudioUrl(blob: Blob): string {
    return URL.createObjectURL(blob);
  }
}
