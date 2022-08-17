import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrollWithFlexComponent } from './scroll-with-flex.component';

const routes: Routes = [{ path: '', component: ScrollWithFlexComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrollWithFlexRoutingModule { }
