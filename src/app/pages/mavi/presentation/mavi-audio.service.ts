import { Injectable } from '@angular/core';
import { StereoAudioRecorder } from 'recordrtc';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaviAudioService {
  private _recorder: StereoAudioRecorder | null = null;

  private _stream: MediaStream | null = null;

  private _state$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  public async start(callback: (chunk: Blob) => void): Promise<void> {
    if (this._recorder) {
      console.error('A gravação de áudio já está em andamento.');
      return;
    }

    try {
      this._stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this._recorder = new StereoAudioRecorder(this._stream, {
        type: 'audio',
        mimeType: 'audio/wav',
        recorderType: StereoAudioRecorder,
        timeSlice: 200,
        disableLogs: true,
        ondataavailable: (blob: Blob) => {
          callback(blob);
        },
      });

      this._recorder.record();
      this._state$.next(true);
    } catch (error) {
      console.error('Falha ao iniciar a gravação de áudio:', error);
      throw new Error('Falha na gravação de áudio');
    }
  }

  public stop(): void {
    if (this._recorder) {
      this._recorder.stop(() => {
        this._stream?.getTracks().forEach((track) => track.stop());
        this._state$.next(false);
        this._recorder = null;
        this._stream = null;
      });
    }
  }

  public createFileReader(chunk: Blob, callback: (arrayBuffer: ArrayBuffer) => void) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(chunk);
    reader.onloadend = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      callback(arrayBuffer);
    };
  }

  public createAudioUrl(chunk: Blob): string {
    return URL.createObjectURL(chunk);
  }

  public getState(): Observable<boolean> {
    return this._state$.asObservable();
  }
}
