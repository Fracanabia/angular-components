import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRadioComponent } from './form-radio.component';

const routes: Routes = [{ path: '', component: FormRadioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRadioRoutingModule { }
