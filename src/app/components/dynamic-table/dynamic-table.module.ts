import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DynamicTableComponent } from './dynamic-table.component';
import { ColumnStatusComponent } from './components/column-status/column-status.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
  ],
  declarations: [DynamicTableComponent, ColumnStatusComponent],
  exports: [DynamicTableComponent],
})
export class DynamicTableModule { }
