import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpInterceptorsComponent } from './http-interceptors.component';

const routes: Routes = [{ path: '', component: HttpInterceptorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class HttpInterceptorsRoutingModule { }
