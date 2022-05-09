import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormGroupedComponent } from './reactive-form-grouped.component';

const routes: Routes = [{ path: '', component: ReactiveFormGroupedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveFormGroupedRoutingModule { }
