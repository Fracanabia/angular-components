import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputNumberRoutingModule } from './input-number-routing.module';
import { InputNumberComponent } from './input-number.component';
import { IsDecimalDirective } from '../../directives/is-decimal.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'
import { MaxDigitsDirective } from '../../directives/max-digits.directive';
import { IsDecPipe } from '../../pipes/is-dec.pipe';


@NgModule({
  declarations: [
    InputNumberComponent,
    IsDecimalDirective,
    IsDecPipe,
    MaxDigitsDirective
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    InputNumberRoutingModule,
    NgxMaskModule
  ]
})
export class InputNumberModule { }
