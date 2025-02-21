import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordComponent } from './record.component';

const routes: Routes = [{ path: '', component: RecordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordRoutingModule { }
