import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsObservableComponent } from './rxjs-observable.component';

const routes: Routes = [{ path: '', component: RxjsObservableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RxjsObservableRoutingModule {}
