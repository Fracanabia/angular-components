import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InpatientListComponent } from './inpatient-list.component';

const routes: Routes = [{ path: '', component: InpatientListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InpatientListRoutingModule { }
