import { Component, OnInit } from '@angular/core';
import { User } from '../../domain/model/user';
import { UserPresenterService } from '../presenters/user.presenter.service';

@Component({
  selector: 'app-clean-arch-boundaries-interactor',
  templateUrl: './clean-arch-boundaries-interactor.component.html',
  styleUrls: ['./clean-arch-boundaries-interactor.component.scss'],
})
export class CleanArchBoundariesInteractorComponent implements OnInit {
  users: User[] = [];

  user: User = {} as User;

  constructor(private readonly _userPresenterService: UserPresenterService) {}

  ngOnInit(): void {
    this.listUser();
  }

  private listUser(): void {
    this._userPresenterService.listUser().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }

  public listUserId(id: number): void {
    this._userPresenterService.listUserId(id).subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }
}
