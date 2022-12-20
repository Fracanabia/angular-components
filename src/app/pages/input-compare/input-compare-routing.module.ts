import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputCompareComponent } from './input-compare.component';

const routes: Routes = [{ path: '', component: InputCompareComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputCompareRoutingModule { }
