import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormContatoComponent } from './form-contato.component';

const routes: Routes = [
  {
    path: '',
    component: FormContatoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormContatoRoutingModule {}
