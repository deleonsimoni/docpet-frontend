import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaVeterinarioComponent } from './lista-veterinario.component';


const routes: Routes = [{
  path : '',
  component : ListaVeterinarioComponent,
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaRoutingModule { }
