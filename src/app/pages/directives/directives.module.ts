import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DirectivesRoutingModule } from './directives-routing.module';
import { DirectivesComponent } from './directives.component';
import { IsDogDirective } from './is-dog.directive';


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
