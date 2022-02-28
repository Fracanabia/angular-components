import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { RxjsObservableRoutingModule } from './rxjs-observable-routing.module';
import { RxjsObservableComponent } from './rxjs-observable.component';

@NgModule({
  declarations: [RxjsObservableComponent, ListComponent],
  imports: [
    CommonModule,
    RxjsObservableRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
})
export class RxjsObservableModule {}
