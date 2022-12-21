import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/components/button/button.module';
import { CleanArchBoundariesInteractorRoutingModule } from './clean-arch-boundaries-interactor-routing.module';
import { UserAdapterService } from './data/user.adapter.service';
import { UserRepositoryService } from './data/user.repository.service';
import { UserGateway } from './domain/boundaries/user.gateway';
import { ListUserIdInteractorService } from './domain/interactors/list-user-id.interactor.service';
import { ListUserInteractorService } from './domain/interactors/list-user.interactor.service';
import { CleanArchBoundariesInteractorComponent } from './presentation/pages/clean-arch-boundaries-interactor.component';
import { UserPresenterService } from './presentation/presenters/user.presenter.service';

@NgModule({
  declarations: [CleanArchBoundariesInteractorComponent],
  imports: [
    CommonModule,
    CleanArchBoundariesInteractorRoutingModule,
    ButtonModule
  ],
  providers: [
    UserRepositoryService,
    UserAdapterService,
    UserPresenterService,
    ListUserInteractorService,
    ListUserIdInteractorService,
    {
      provide: UserGateway,
      useExisting: UserAdapterService,
    },
  ],
})
export class CleanArchBoundariesInteractorModule {}
