import { Component } from '@angular/core';

@Component({
  selector: 'app-mat-calendar-test',
  templateUrl: './mat-calendar-test.component.html',
  styleUrls: ['./mat-calendar-test.component.scss']
})
export class MatCalendarTestComponent {
  selected: Date | null = new Date();

  constructor() { }


}
