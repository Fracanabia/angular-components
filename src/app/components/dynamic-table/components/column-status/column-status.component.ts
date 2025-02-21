import { Component, Inject } from '@angular/core';
import { DATA_TABLE } from '../../dynamic-table.component';

@Component({
  selector: 'app-column-status',
  templateUrl: './column-status.component.html',
  styleUrls: ['./column-status.component.scss'],
})
export class ColumnStatusComponent {
  constructor(@Inject(DATA_TABLE) public data: string) {
    console.log('DATA_TABLE', data);
  }
}
