import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {FormRadioRoutingModule} from './form-radio-routing.module';
import {FormRadioComponent} from './form-radio.component';


@NgModule({
  declarations: [
    FormRadioComponent
  ],
  imports: [
    CommonModule,
    FormRadioRoutingModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    FlexLayoutModule
  ]
})
export class FormRadioModule { }
