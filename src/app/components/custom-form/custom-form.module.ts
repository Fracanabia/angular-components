import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormArrayComponent } from './components/custom-form-array/custom-form-array.component';
import { CustomFormInputsComponent } from './components/custom-form-inputs/custom-form-inputs.component';
import { CustomFormJsonComponent } from './components/custom-form-json/custom-form-json.component';
import { CustomFormComponent } from './custom-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [
    CustomFormComponent,
    CustomFormArrayComponent,
    CustomFormInputsComponent,
    CustomFormJsonComponent,
  ],
  exports: [CustomFormComponent]
})
export class CustomFormModule {}
