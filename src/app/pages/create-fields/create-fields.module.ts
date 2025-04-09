import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomFormModule } from '../../components/custom-form/custom-form.module';
import { CreateFieldsComponent } from './create-fields.component';
import { CreateFieldsRoutingModule } from './create-fields.routing.module';
import { NativeRecordModule } from '../native-record/native-record.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CreateFieldsRoutingModule,
    FormsModule,
    CustomFormModule,
    MatExpansionModule,
    NativeRecordModule
  ],
  declarations: [CreateFieldsComponent],
})
export class CreateFieldsModule {}
