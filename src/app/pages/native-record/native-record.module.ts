import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeRecordComponent } from './native-record.component';
import { NativeRecordRoutingModule } from './native-record.routing.module';

@NgModule({
  imports: [
    CommonModule,
    NativeRecordRoutingModule
  ],
  declarations: [NativeRecordComponent]
})
export class NativeRecordModule { }
