import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogCadastroComponent } from './blog-cadastro.component';

const routes: Routes = [{ path: '', component: BlogCadastroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogCadastroRoutingModule { }
