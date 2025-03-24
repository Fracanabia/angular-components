export interface MaviState {
  stateSpeech: boolean;
  error: string | null;
  recognized: string
}

export const initialState: MaviState = {
  stateSpeech: false,
  error: null,
  recognized: ''
};
