import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroVeterinarioComponent } from './cadastro-veterinario.component';

const routes: Routes = [{ path: '', component: CadastroVeterinarioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroVeterinarioRoutingModule { }
