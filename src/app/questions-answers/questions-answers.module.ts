import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsAnswersComponent } from './questions-answers.component';
import { QuestionsAnswersRoutingModule } from './questions-answers-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [QuestionsAnswersComponent],
  imports: [
    CommonModule,
    QuestionsAnswersRoutingModule,
    NgxSelectModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxMaskModule.forChild(),
  ],
})
export class QuestionsAnswersModule { }
