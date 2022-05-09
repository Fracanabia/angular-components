import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChecagemRoutingModule } from './checagem-routing.module';
import { ChecagemComponent } from './checagem.component';



@NgModule({
  declarations: [
    ChecagemComponent
  ],
  imports: [
    CommonModule,
    ChecagemRoutingModule,
    MatToolbarModule,
    MatDividerModule
    
  ]
})
export class ChecagemModule { }
