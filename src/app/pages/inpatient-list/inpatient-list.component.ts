import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

 interface Inpatient {
    id: number;
    status: string;
    patient: {
      name: string
    };
    admissionDate: string;
  }


@Component({
  selector: 'app-inpatient-list',
  templateUrl: './inpatient-list.component.html',
  styleUrls: ['./inpatient-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InpatientListComponent implements OnInit {
  columns = [
    {
      id: 1,
      label: 'Id',
      field: 'id',
      width: '20%',
      customRender: null,
      sortable: true,
    },
    {
      id: 2,
      label: 'Name',
      field: 'patient',
      nestedField: 'name',
      width: '100px',
      customRender: null,
      sortable: true,
    },
    {
      id: 3,
      label: 'Admission Date',
      field: 'admissionDate',
      width: '100px',
      customRender: 'statusRender',
      sortable: true,
    },
    {
      id: 4,
      label: 'Status',
      field: 'status',
      width: '100px',
      customRender: 'statusRender',
      sortable: true,
    },
  ];

  data:Inpatient[] = [];

  constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.data = [
      { id: 1, status: 'Active', patient: {name: "AAAA"},  admissionDate: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date()) },
      { id: 2, status: 'Inactive', patient: {name: "BBBB"},  admissionDate: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date()) },
    ];
  }

  addRandomElements(count: number) {
    const elements = ['Active', 'Inactive'];
    const newElements: Inpatient[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * elements.length);
      const newElement: Inpatient = {
        id: this.data.length + 1 + i,
        status: elements[randomIndex],
        patient: { name: `Random Name ${this.data.length + 1 + i}`},
        admissionDate:  new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date()),
      };
      newElements.push(newElement);
    }
    this.data = [...this.data, ...newElements];
    this._changeDetectorRef.markForCheck();
  }
}
