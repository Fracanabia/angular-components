import { createAction, props } from '@ngrx/store';
export const MAVI_KEY = '@workspace/mavi';

export const startSpeech = createAction(`${MAVI_KEY} Start Speech`);

export const stopSpeech = createAction(`${MAVI_KEY} Stop Speech`);

export const stateSpeech = createAction(
  `${MAVI_KEY} State Speech`,
  props<{ stateSpeech: boolean }>()
);

export const recognized = createAction(
  `${MAVI_KEY} Recognized`,
  props<{ recognized: string }>()
);

export const startWebsocket = createAction(`${MAVI_KEY} Start Websocket`);

export const stopWebsocket = createAction(`${MAVI_KEY} Stop Websocket`);

export const stateWebsocket = createAction(
  `${MAVI_KEY} State Websocket `,
  props<{ stateWebsocket: boolean }>()
);
