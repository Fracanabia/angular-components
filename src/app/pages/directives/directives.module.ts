import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IsDogDirective } from '../../directives/is-dog.directive';
import { DirectivesRoutingModule } from './directives-routing.module';
import { DirectivesComponent } from './directives.component';


@NgModule({
  declarations: [
    DirectivesComponent,
    IsDogDirective
  ],
  imports: [
    CommonModule,
    DirectivesRoutingModule,
  ]
})
export class DirectivesModule { }
