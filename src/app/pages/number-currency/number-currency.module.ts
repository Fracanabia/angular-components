import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IsDecimalPipe } from '../../pipes/is-decimal.pipe';
import { NumberCurrencyRoutingModule } from './number-currency-routing.module';
import { NumberCurrencyComponent } from './number-currency.component';

@NgModule({
  imports: [CommonModule, NumberCurrencyRoutingModule],
  declarations: [NumberCurrencyComponent, IsDecimalPipe],
})
export class NumberCurrencyModule {}
