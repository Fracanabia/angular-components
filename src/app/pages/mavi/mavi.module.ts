import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MAVI_KEY } from './domain/reducers/mavi.actions';
import { MaviEffects } from './domain/reducers/mavi.effects';
import { maviReducer } from './domain/reducers/mavi.reducer';

import { MaviRoutingModule } from './mavi.routing.module';
import { MaviComponent } from './presentation/pages/mavi.component';

@NgModule({
  imports: [
    CommonModule,
    MaviRoutingModule,
    StoreModule.forFeature(MAVI_KEY, maviReducer),
    EffectsModule.forFeature([MaviEffects]),
  ],
  declarations: [MaviComponent],
})
export class MaviModule {}
