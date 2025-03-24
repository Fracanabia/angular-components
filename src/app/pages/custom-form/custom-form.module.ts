import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormArrayComponent } from './custom-form-array/custom-form-array.component';
import { CustomFormInputsComponent } from './custom-form-inputs/custom-form-inputs.component';
import { CustomFormJsonComponent } from './custom-form-json/custom-form-json.component';
import { CustomFormComponent } from './custom-form.component';
import { CustomFormRoutingModule } from './custom-form.routing.module';

@NgModule({
  imports: [CommonModule, CustomFormRoutingModule, ReactiveFormsModule],
  declarations: [
    CustomFormComponent,
    CustomFormArrayComponent,
    CustomFormInputsComponent,
    CustomFormJsonComponent,
  ],
  exports: [CustomFormComponent]
})
export class CustomFormModule {}
