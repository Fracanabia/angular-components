import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent } from './record.component';
import { RecordRoutingModule } from './record-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RecordRoutingModule
  ],
  declarations: [RecordComponent]
})
export class RecordModule { }
