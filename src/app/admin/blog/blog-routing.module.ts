import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';


const routes: Routes = [{
  path : '',
  component : BlogComponent,
  children: [
    { path: '', redirectTo: 'lista', pathMatch: 'full' },
    {
      path: 'blog-lista',
      loadChildren: () =>
        import('./blog-lista/blog-lista.module').then((m) => m.BlogListaModule),
    },
    {
      path: 'blog-cadastro',
      loadChildren: () =>
        import('./blog-cadastro/blog-cadastro.module').then((m) => m.BlogCadastroModule),
    },
    { path: 'altera/:id', loadChildren: () =>
      import('./blog-cadastro/blog-cadastro.module').then((m) => m.BlogCadastroModule),
    }

  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
