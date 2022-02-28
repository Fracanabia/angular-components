import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TableTestRoutingModule } from './table-test-routing.module';
import { TableTestComponent } from './table-test.component';

@NgModule({
  declarations: [TableTestComponent],
  imports: [CommonModule, TableTestRoutingModule, MatIconModule],
})
export class TableTestModule {}
