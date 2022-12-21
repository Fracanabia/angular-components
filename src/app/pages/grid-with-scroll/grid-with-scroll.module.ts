import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonModule } from './../../components/button/button.module';
import { GridWithScrollRoutingModule } from './grid-with-scroll-routing.module';
import { GridWithScrollComponent } from './grid-with-scroll.component';



@NgModule({
  declarations: [
    GridWithScrollComponent
  ],
  imports: [
    CommonModule,
    GridWithScrollRoutingModule,
    FlexLayoutModule,
    ButtonModule
  ]
})
export class GridWithScrollModule { }
