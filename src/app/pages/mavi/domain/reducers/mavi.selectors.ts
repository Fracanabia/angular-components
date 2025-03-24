import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAVI_KEY } from './mavi.actions';
import { MaviState } from './mavi.state';

export const selectMaviState = createFeatureSelector<MaviState>(MAVI_KEY);

// Verificar se está gravando;
export const selectStateSpeech = createSelector(selectMaviState, (state) => state.stateSpeech);
