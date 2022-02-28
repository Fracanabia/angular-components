import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule as CalendarAngular } from 'angular-calendar';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';



@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    CalendarAngular
  ]
})
export class CalendarModule { }
