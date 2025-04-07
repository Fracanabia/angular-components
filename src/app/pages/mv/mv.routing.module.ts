import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MvComponent } from './mv.component';

const routes: Routes = [{ path: '', component: MvComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MvRoutingModule { }
