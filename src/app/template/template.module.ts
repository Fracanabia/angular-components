import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { FilterStringPipe } from '../pipes/filter-string.pipe';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [NavigationComponent, FilterStringPipe],
  imports: [CommonModule, AppRoutingModule, FormsModule],
  exports: [NavigationComponent],
})
export class TemplateModule {}
