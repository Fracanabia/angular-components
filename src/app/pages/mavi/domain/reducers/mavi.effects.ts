import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  map
} from 'rxjs';
import { MaviSpeechService } from '../../presentation/mavi-speech.service';
import * as MaviActions from './mavi.actions';

@Injectable()
export class MaviEffects {
  constructor(
    private actions$: Actions,
    private _maviSpeechService: MaviSpeechService,
    private store: Store
  ) {}

  startRecording$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaviActions.startSpeech),
        map(() => {
          this._maviSpeechService.start();

          this._maviSpeechService.onResult((event) => {
            let recognized = '';
            const { results, resultIndex } = event;

            if (results[resultIndex].isFinal) {
              recognized += (results[resultIndex][0].transcript as string)
                .toLowerCase()
                .trim();
            }

            if (recognized) {
              this.store.dispatch(MaviActions.recognized({ recognized }));
            }
          });

          this._maviSpeechService.onEnd(() => {
            this._maviSpeechService.start();
          });

          return MaviActions.stateSpeech({ stateSpeech: true })
        })
      );
    },

  );

  stopRecording$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaviActions.stopSpeech),
        map(() => {
          this._maviSpeechService.stop();
          this.store.dispatch(MaviActions.stateSpeech({ stateSpeech: false }));
        })
      );
    },
    { dispatch: false }
  );

  recognized$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaviActions.recognized),
        map(({ recognized }) => {
          if (recognized.includes('mavi')) {
            this.store.dispatch(MaviActions.stopSpeech());
          }
        })
      );
    },
    { dispatch: false }
  );
}
