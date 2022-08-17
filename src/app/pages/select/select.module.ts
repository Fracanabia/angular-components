import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectRoutingModule } from './select-routing.module';
import { SelectComponent } from './select.component';



@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SelectRoutingModule
  ]
})
export class SelectModule { }
