import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollWithFlexRoutingModule } from './scroll-with-flex-routing.module';
import { ScrollWithFlexComponent } from './scroll-with-flex.component';


@NgModule({
  declarations: [
    ScrollWithFlexComponent
  ],
  imports: [
    CommonModule,
    ScrollWithFlexRoutingModule
  ]
})
export class ScrollWithFlexModule { }
