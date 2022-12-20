import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { InputCompareRoutingModule } from './input-compare-routing.module';
import { InputCompareComponent } from './input-compare.component';


@NgModule({
  declarations: [
    InputCompareComponent
  ],
  imports: [
    CommonModule,
    InputCompareRoutingModule,
    ReactiveFormsModule
  ]
})
export class InputCompareModule { }
