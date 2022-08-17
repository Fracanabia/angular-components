import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridWithScrollComponent } from './grid-with-scroll.component';

const routes: Routes = [{ path: '', component: GridWithScrollComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GridWithScrollRoutingModule { }
