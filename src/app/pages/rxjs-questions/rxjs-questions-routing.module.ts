import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsQuestionsComponent } from './rxjs-questions.component';

const routes: Routes = [{ path: '', component: RxjsQuestionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RxjsQuestionsRoutingModule {}
