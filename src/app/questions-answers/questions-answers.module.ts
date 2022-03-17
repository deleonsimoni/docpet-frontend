import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsAnswersComponent } from './questions-answers.component';
import { QuestionsAnswersRoutingModule } from './questions-answers-routing.module';

@NgModule({
  declarations: [QuestionsAnswersComponent],
  imports: [CommonModule, QuestionsAnswersRoutingModule],
})
export class QuestionsAnswersModule {}
