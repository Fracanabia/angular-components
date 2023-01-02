import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgContainerComponent } from './ng-container.component';

const routes: Routes = [{ path: '', component: NgContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgContainerRoutingModule { }
