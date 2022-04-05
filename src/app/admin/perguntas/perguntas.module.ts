import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerguntasComponent } from './perguntas.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule, Routes } from '@angular/router';
import { NgxSelectModule } from 'ngx-select-ex';

const routes: Routes = [
  {
    path: '',
    component: PerguntasComponent
  }
];

@NgModule({
  declarations: [PerguntasComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxSelectModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxMaskModule.forChild(),
  ],
  exports: [RouterModule]
})
export class PerguntasModule { }
