import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ng-container',
  templateUrl: './ng-container.component.html',
  styleUrls: ['./ng-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgContainerComponent {
  public count = 1;

  constructor() {}

  public sum(): string {
    return `${this.count++}`;
  }

  public multiply(): string {
    console.log(this.count);
    return `${this.count * this.count}`;
  }
}
