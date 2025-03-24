import { Injectable } from '@angular/core';
import { StereoAudioRecorder } from 'recordrtc';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private _recorder!: StereoAudioRecorder;
  private _stream!: MediaStream | null;

  constructor() {}

  // Inicia a gravação e executa um callback com cada novo chunk de áudio
  async startRecording(callback: (chunk: Blob) => void) {
    // Solicita permissão para acessar o microfone
    this._stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Cria o gravador de áudio
    this._recorder = new StereoAudioRecorder(this._stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      timeSlice: 1000, // A cada 1 segundo
      audioBitsPerSecond: 32000, // Reduz a taxa de bits para 32 kbps
      // sampleRate: 8000, // Reduz a taxa de amostragem para 8 kHz (qualidade mais baixa)
      numberOfAudioChannels: 1, // Gravação em mono (reduz a qualidade)
      bufferSize: 8192, // Reduz o tamanho do buffer, o que pode ajudar a diminuir o uso de recursos
      disableLogs: true,
      ondataavailable: (blob) => {
        callback(blob); // Passa o chunk para o callback
      },
    });

    // Inicia a gravação
    this._recorder.record();
  }

  // Para a gravação e retorna o blob completo
  stopRecording(): void {
    this._recorder.stop(() => {
      if (this._stream) {
        this._stream.getTracks().forEach((track) => track.stop());
        this._stream = null;
      }
    });
  }

  async validateAudioChunk(chunk: Blob): Promise<boolean> {
    return new Promise((resolve) => {
      const audioContext = new AudioContext();
      const reader = new FileReader();

      reader.onload = async (event) => {
        if (!event.target?.result) {
          resolve(false);
          return;
        }

        const arrayBuffer = event.target.result as ArrayBuffer;
        try {
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          const channelData = audioBuffer.getChannelData(0); // Pegando o primeiro canal de áudio

          // Calcula a amplitude média do chunk
          const sum = channelData.reduce((acc, val) => acc + Math.abs(val), 0);
          const avgAmplitude = sum / channelData.length;

          const threshold = 0.01; // Define um limite mínimo para considerar como áudio válido
          resolve(avgAmplitude > threshold);
        } catch (error) {
          console.error('Erro ao processar chunk de áudio:', error);
          resolve(false);
        }
      };

      reader.readAsArrayBuffer(chunk);
    });
  }

  // Método para criar a URL do áudio gravado
  createAudioUrl(blob: Blob): string {
    return URL.createObjectURL(blob);
  }
}
