import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatCalendarTestComponent } from './mat-calendar-test.component';

const routes: Routes = [{ path: '', component: MatCalendarTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatCalendarTestRoutingModule { }
