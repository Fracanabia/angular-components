import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './../../components/button/button.module';

import { HttpInterceptorsRoutingModule } from './http-interceptors-routing.module';
import { HttpInterceptorsComponent } from './http-interceptors.component';


@NgModule({
  declarations: [
    HttpInterceptorsComponent
  ],
  imports: [
    CommonModule,
    HttpInterceptorsRoutingModule,
    ButtonModule
  ]
})
export class HttpInterceptorsModule { }
