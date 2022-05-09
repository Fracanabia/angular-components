import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCalendarTestRoutingModule } from './mat-calendar-test-routing.module';
import { MatCalendarTestComponent } from './mat-calendar-test.component';



@NgModule({
  declarations: [
    MatCalendarTestComponent
  ],
  imports: [
    CommonModule,
    MatCalendarTestRoutingModule,
    MatDatepickerModule,
    MatCardModule
  ]
})
export class MatCalendarTestModule { }
