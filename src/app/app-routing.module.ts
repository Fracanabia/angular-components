import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
 { path: '',loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule) },
 { path: 'home',loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule) },
 { path: 'button-test',loadChildren: () => import('./pages/button-test/button-test.module').then((m) => m.ButtonTestModule ) },
 { path: 'rxjs-observable',loadChildren: () => import('./pages/rxjs-observable/rxjs-observable.module').then((m) => m.RxjsObservableModule ) },
 { path: 'clean-arch-boundaries-interactor',loadChildren: () => import('./pages/clean-arch-boundaries-interactor/clean-arch-boundaries-interactor.module').then((m) => m.CleanArchBoundariesInteractorModule) },
 { path: 'select', loadChildren: () => import('./pages/select/select.module').then(m => m.SelectModule) },
 { path: 'form-radio', loadChildren: () => import('./pages/form-radio/form-radio.module').then(m => m.FormRadioModule) },
 { path: 'input-number', loadChildren: () => import('./pages/input-number/input-number.module').then(m => m.InputNumberModule) },
 { path: 'grid-with-scroll', loadChildren: () => import('./pages/grid-with-scroll/grid-with-scroll.module').then(m => m.GridWithScrollModule) },
 { path: 'scroll-with-flex', loadChildren: () => import('./pages/scroll-with-flex/scroll-with-flex.module').then(m => m.ScrollWithFlexModule) },
 { path: 'input-compare', loadChildren: () => import('./pages/input-compare/input-compare.module').then(m => m.InputCompareModule) },
 { path: 'http-interceptors', loadChildren: () => import('./pages/http-interceptors/http-interceptors.module').then(m => m.HttpInterceptorsModule) },
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
})
export class AppRoutingModule {}
