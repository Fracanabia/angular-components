import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'button-test',
    loadChildren: () =>
      import('./pages/button-test/button-test.module').then(
        (m) => m.ButtonTestModule
      ),
  },
  {
    path: 'table-test',
    loadChildren: () =>
      import('./pages/table-test/table-test.module').then(
        (m) => m.TableTestModule
      ),
  },
  {
    path: 'rxjs-observable',
    loadChildren: () =>
      import('./pages/rxjs-observable/rxjs-observable.module').then(
        (m) => m.RxjsObservableModule
      ),
  },
  {
    path: 'clean-arch-boundaries-interactor',
    loadChildren: () =>
      import(
        './pages/clean-arch-boundaries-interactor/clean-arch-boundaries-interactor.module'
      ).then((m) => m.CleanArchBoundariesInteractorModule),
  },
  { path: 'calendar', loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule) },
  { path: 'mat-calendar-test', loadChildren: () => import('./pages/mat-calendar-test/mat-calendar-test.module').then(m => m.MatCalendarTestModule) },
  { path: 'checagem', loadChildren: () => import('./pages/checagem/checagem.module').then(m => m.ChecagemModule) },
  { path: 'reactive-form-grouped', loadChildren: () => import('./pages/reactive-form-grouped/reactive-form-grouped.module').then(m => m.ReactiveFormGroupedModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
