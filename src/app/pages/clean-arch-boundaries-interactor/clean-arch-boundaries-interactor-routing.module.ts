import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CleanArchBoundariesInteractorComponent } from './presentation/pages/clean-arch-boundaries-interactor.component';

const routes: Routes = [
  { path: '', component: CleanArchBoundariesInteractorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CleanArchBoundariesInteractorRoutingModule {}
