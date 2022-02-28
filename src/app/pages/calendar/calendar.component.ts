import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { TEST_EVENTS } from './mock';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {


  viewDate: Date = new Date();

  refresh = new Subject<void>();

  testEvent: any[] = TEST_EVENTS.listaEventos.map((event:any) => ({
    start: new Date(event.startTime),
    end: new Date(event.endTime),
    title: event.title as string,
    color: colors.red as string,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
  }))

  



}
