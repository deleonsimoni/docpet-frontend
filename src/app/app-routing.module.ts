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
  {
    path: 'list/:id/:municipio',
    loadChildren: () => import('./search-doctor/search-doctor.module').then((m) => m.SearchDoctorModule),
  },
  {
    path: 'doctor/:nome/:municipio',
    loadChildren: () => import('./doctor-profile/doctor-profile.module').then((m) => m.DoctorProfileModule),
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
