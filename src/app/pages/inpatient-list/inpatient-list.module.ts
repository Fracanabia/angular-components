import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InpatientListComponent } from './inpatient-list.component';
import { DynamicTableModule } from '../../components/dynamic-table/dynamic-table.module';
import { InpatientListRoutingModule } from './inpatient-list-routing.module';
import { ButtonModule } from "../../components/button/button.module";

@NgModule({
  imports: [
    CommonModule,
    InpatientListRoutingModule,
    DynamicTableModule,
    ButtonModule
],
  declarations: [InpatientListComponent],
})
export class InpatientListModule { }
