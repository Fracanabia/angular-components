import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from './../../components/button/button.module';
import { ButtonTestRoutingModule } from './button-test-routing.module';
import { ButtonTestComponent } from './button-test.component';

@NgModule({
  declarations: [ButtonTestComponent],
  imports: [CommonModule, ButtonTestRoutingModule, MatIconModule, ButtonModule],
})
export class ButtonTestModule {}
