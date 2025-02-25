import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IaComponent } from './ia.component';

const routes: Routes = [{ path: '', component: IaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IaRoutingModule { }
