import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RxjsQuestionsRoutingModule } from './rxjs-questions-routing.module';
import { RxjsQuestionsComponent } from './rxjs-questions.component';
import { ChildrenComponent } from './children/children.component';

@NgModule({
  declarations: [RxjsQuestionsComponent, ChildrenComponent],
  imports: [CommonModule, RxjsQuestionsRoutingModule, ReactiveFormsModule],
})
export class RxjsQuestionsModule {}
