import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanoComponent } from './plano.component';


const routes: Routes = [{
  path : '',
  component : PlanoComponent,
  children: [
    { path: '', redirectTo: 'lista', pathMatch: 'full' },
    {
      path: 'lista',
      loadChildren: () =>
        import('./lista/lista.module').then((m) => m.ListaModule),
    },
    {
      path: 'cadastro',
      loadChildren: () =>
        import('./cadastro/cadastro.module').then((m) => m.CadastroModule),
    },
    { path: 'altera/:id', loadChildren: () =>
      import('./cadastro/cadastro.module').then((m) => m.CadastroModule),
    }

  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanoRoutingModule { }
