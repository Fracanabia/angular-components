import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MaviComponent } from './presentation/pages/mavi.component';

const routes: Routes = [{ path: '', component: MaviComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MaviRoutingModule { }
