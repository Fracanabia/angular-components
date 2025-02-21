import { Routes, RouterModule } from '@angular/router';
import { NativeRecordComponent } from './native-record.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: NativeRecordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NativeRecordRoutingModule { }
