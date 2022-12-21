import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRadioRoutingModule } from './form-radio-routing.module';
import { FormRadioComponent } from './form-radio.component';


@NgModule({
  declarations: [
    FormRadioComponent
  ],
  imports: [
    CommonModule,
    FormRadioRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class FormRadioModule { }
