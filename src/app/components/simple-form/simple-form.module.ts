import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomFormArrayComponent } from './components/custom-form-array/custom-form-array.component';
import { CustomFormInputsComponent } from './components/custom-form-inputs/custom-form-inputs.component';
import { CustomFormJsonComponent } from './components/custom-form-json/custom-form-json.component';
import { SimpleFormComponent } from './simple-form.component';
import { SimpleFormService } from './simple-form.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    SimpleFormComponent,
    CustomFormArrayComponent,
    CustomFormJsonComponent,
    CustomFormInputsComponent,
  ],
  exports: [SimpleFormComponent],
  providers: [SimpleFormService],
})
export class SimpleFormModule {}
