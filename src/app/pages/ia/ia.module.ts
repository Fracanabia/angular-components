import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IaComponent } from './ia.component';
import { FormsModule } from '@angular/forms';
import { IaRoutingModule } from './ia.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IaRoutingModule
  ],
  declarations: [IaComponent]
})
export class IaModule { }
