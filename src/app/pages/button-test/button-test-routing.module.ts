import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonTestComponent } from './button-test.component';

const routes: Routes = [{ path: '', component: ButtonTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ButtonTestRoutingModule {}
