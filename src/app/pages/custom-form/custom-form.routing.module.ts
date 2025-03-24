import { Routes, RouterModule } from '@angular/router';
import { CustomFormComponent } from './custom-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: CustomFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomFormRoutingModule { }
