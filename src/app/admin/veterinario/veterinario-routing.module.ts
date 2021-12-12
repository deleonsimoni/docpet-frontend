import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeterinarioComponent } from './veterinario.component';


const routes: Routes = [{
  path : '',
  component : VeterinarioComponent,
  children: [
    { path: '', redirectTo: 'lista', pathMatch: 'full' },
    {
      path: 'lista',
      loadChildren: () =>
        import('./lista/lista-veterinario.module').then((m) => m.ListaModule),
    },
    {
      path: 'cadastro',
      loadChildren: () =>
        import('./cadastro/cadastro-veterinario.module').then((m) => m.CadastroVeterinarioModule),
    },
    { path: 'altera/:id', loadChildren: () =>
      import('./cadastro/cadastro-veterinario.module').then((m) => m.CadastroVeterinarioModule),
    }

  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeterinarioRoutingModule { }
