import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MaviActions from '../../domain/reducers/mavi.actions';
import { selectStateSpeech } from '../../domain/reducers/mavi.selectors';

@Component({
  selector: 'app-mavi',
  templateUrl: './mavi.component.html',
  styleUrls: ['./mavi.component.scss'],
})
export class MaviComponent {
  public stateSpeech$ = this.store.select(selectStateSpeech);

  constructor(private readonly store: Store) {}

  public start() {
    this.store.dispatch(MaviActions.startSpeech());
  }

  public stop() {
    this.store.dispatch(MaviActions.stopSpeech());
  }
}
