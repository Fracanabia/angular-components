import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecagemComponent } from './checagem.component';

const routes: Routes = [{ path: '', component: ChecagemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecagemRoutingModule { }
