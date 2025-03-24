import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IaComponent } from './ia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IaRoutingModule } from './ia.routing.module';
import { NativeRecordModule } from '../native-record/native-record.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IaRoutingModule,
    ReactiveFormsModule,
    NativeRecordModule
  ],
  declarations: [IaComponent]
})
export class IaModule { }
