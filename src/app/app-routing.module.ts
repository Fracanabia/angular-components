import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
 { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: 'home',loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule) },
 { path: 'button-test',loadChildren: () => import('./pages/button-test/button-test.module').then((m) => m.ButtonTestModule ) },
 { path: 'clean-arch-boundaries-interactor',loadChildren: () => import('./pages/clean-arch-boundaries-interactor/clean-arch-boundaries-interactor.module').then((m) => m.CleanArchBoundariesInteractorModule) },
 { path: 'directives', loadChildren: () => import('./pages/directives/directives.module').then(m => m.DirectivesModule) },
 { path: 'form-radio', loadChildren: () => import('./pages/form-radio/form-radio.module').then(m => m.FormRadioModule) },
 { path: 'grid-with-scroll', loadChildren: () => import('./pages/grid-with-scroll/grid-with-scroll.module').then(m => m.GridWithScrollModule) },
 { path: 'http-interceptors', loadChildren: () => import('./pages/http-interceptors/http-interceptors.module').then(m => m.HttpInterceptorsModule) },
 { path: 'input-compare', loadChildren: () => import('./pages/input-compare/input-compare.module').then(m => m.InputCompareModule) },
 { path: 'input-number', loadChildren: () => import('./pages/input-number/input-number.module').then(m => m.InputNumberModule) },
 { path: 'number-currency', loadChildren: () => import('./pages/number-currency/number-currency.module').then(m => m.NumberCurrencyModule) },
 { path: 'ng-container', loadChildren: () => import('./pages/ng-container/ng-container.module').then(m => m.NgContainerModule) },
 { path: 'rxjs-observable',loadChildren: () => import('./pages/rxjs-observable/rxjs-observable.module').then((m) => m.RxjsObservableModule ) },
 { path: 'scroll-with-flex', loadChildren: () => import('./pages/scroll-with-flex/scroll-with-flex.module').then(m => m.ScrollWithFlexModule) },
 { path: 'select', loadChildren: () => import('./pages/select/select.module').then(m => m.SelectModule) },
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
})
export class AppRoutingModule {}
