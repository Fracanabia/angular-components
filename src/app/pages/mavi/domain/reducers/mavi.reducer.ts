import { createReducer, on } from '@ngrx/store';
import * as MaviActions from './mavi.actions';
import { initialState, MaviState } from './mavi.state';

export const maviReducer = createReducer<MaviState>(
  initialState,
  on(
    MaviActions.stateSpeech,
    (state, { stateSpeech }): MaviState => ({
      ...state,
      stateSpeech,
      error: null, // Limpar erro ao alterar o estado
    })
  ),
  on(
    MaviActions.recognized,
    (state, { recognized }): MaviState => ({
      ...state,
      recognized, // Armazena o texto recognized
    })
  )
);
