import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SimpleFormModule } from '../../components/simple-form/simple-form.module';
import { MvComponent } from './mv.component';
import { MvRoutingModule } from './mv.routing.module';

@NgModule({
  imports: [
    CommonModule,
    MvRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    SimpleFormModule,
  ],
  declarations: [MvComponent],
})
export class MvModule {}
