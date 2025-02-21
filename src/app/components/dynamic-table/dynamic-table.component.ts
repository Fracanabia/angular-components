import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  InjectionToken,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewChild
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnStatusComponent } from './components/column-status/column-status.component';

const COMPONENT_MAP: { [key: string]: Type<any> } = {
  statusRender: ColumnStatusComponent,
};

export const DATA_TABLE = new InjectionToken<any>('DATA_TABLE');

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent<T>
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() data: T[] = [];

  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatSort) sort!: MatSort;

  @Input() columns: Array<{
    id: number;
    label: string;
    field: any;
    nestedField?: any;
    width: string;
    customRender?: string | null;
    sortable: boolean;
  }> = [];

  displayedColumns: string[] = [];

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private injector: Injector
  ) {}

  createInjector(data: any): Injector {
    return Injector.create({
      providers: [
        {
          provide: DATA_TABLE,
          useValue: data,
        },
      ],
      parent: this.injector,
    });
  }

  sortingDataAccessorFunction(obj: any, property: string): any {
    return property.split('.').reduce((o, p) => o && o[p], obj);
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((col) => col.nestedField ? col.field + '.' + col.nestedField : col.field);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.dataSource.data = this.data;
      this._changeDetectorRef.markForCheck();
    }
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sortingDataAccessor = this.sortingDataAccessorFunction;
      this.dataSource.sort = this.sort;
      this._changeDetectorRef.markForCheck();
    } else {
      console.error('MatSort is not initialized.');
    }
  }

  getComponent(column: string): any {
    const customRender = this.columns.find(
      (col) => col.field === column
    )?.customRender;
    return customRender && COMPONENT_MAP[customRender]
      ? COMPONENT_MAP[customRender]
      : null;
  }
}
