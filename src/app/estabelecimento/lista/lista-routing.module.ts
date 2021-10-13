import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista.component';


const routes: Routes = [{
  path : '',
  component : ListaComponent,
  /*children: [
    {
      path: 'cadastro',
      loadChildren: () =>
        import('../cadastro/cadastro.module').then(
          (m) => m.CadastroModule
        ),
    },
  ] */
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaRoutingModule { }
