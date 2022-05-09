import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormGroupedRoutingModule } from './reactive-form-grouped-routing.module';
import { ReactiveFormGroupedComponent } from './reactive-form-grouped.component';



@NgModule({
  declarations: [
    ReactiveFormGroupedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormGroupedRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReactiveFormGroupedModule { }
