import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateFieldsComponent } from './create-fields.component';
import { CreateFieldsRoutingModule } from './create-fields.routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomFormModule } from '../../components/custom-form/custom-form.module';

@NgModule({
  imports: [
    CommonModule,
    CreateFieldsRoutingModule,
    CustomFormModule,
    MatExpansionModule,
  ],
  declarations: [CreateFieldsComponent],
})
export class CreateFieldsModule {}
