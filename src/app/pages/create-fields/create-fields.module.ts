import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateFieldsComponent } from './create-fields.component';
import { CreateFieldsRoutingModule } from './create-fields.routing.module';
import { CustomFormModule } from '../custom-form/custom-form.module';

@NgModule({
  imports: [CommonModule, CreateFieldsRoutingModule, CustomFormModule],
  declarations: [CreateFieldsComponent],
})
export class CreateFieldsModule {}
