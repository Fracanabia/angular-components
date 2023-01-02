import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgContainerRoutingModule } from './ng-container-routing.module';
import { NgContainerComponent } from './ng-container.component';


@NgModule({
  declarations: [
    NgContainerComponent
  ],
  imports: [
    CommonModule,
    NgContainerRoutingModule
  ]
})
export class NgContainerModule { }
