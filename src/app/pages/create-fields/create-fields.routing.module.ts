import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFieldsComponent } from './create-fields.component';

const routes: Routes = [{ path: '', component: CreateFieldsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateFieldsRoutingModule {}
