import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'estabelecimento',
    loadChildren: () => import('./estabelecimento/estabelecimento.module').then((m) => m.EstabelecimentoModule),
  },
  {
    path: 'veterinario',
    loadChildren: () => import('./veterinario/veterinario.module').then((m) => m.VeterinarioModule),
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
