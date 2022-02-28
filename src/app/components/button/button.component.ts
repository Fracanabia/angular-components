import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],

})
export class ButtonComponent {
  @Input() disabled: boolean = false

  @Input() color: string = '';

  constructor() {
  }
}
