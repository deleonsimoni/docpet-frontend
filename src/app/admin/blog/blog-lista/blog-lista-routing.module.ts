import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogListaComponent } from './blog-lista.component';


const routes: Routes = [{
  path : '',
  component : BlogListaComponent,
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogListaRoutingModule { }
