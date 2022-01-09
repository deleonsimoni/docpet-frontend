import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'list/:especialidade/:municipio',
    loadChildren: () => import('./search-doctor/search-doctor.module').then((m) => m.SearchDoctorModule),
  },
  {
    path: 'doctor/:nome/:especialidade/:municipio',
    loadChildren: () => import('./doctor-profile/doctor-profile.module').then((m) => m.DoctorProfileModule),
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./form-contato/form-contato.module').then((m) => m.FormContatoModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule),
  },
  {
    path: 'update-password/:token',
    loadChildren: () => import('./update-password/update-password.module').then((m) => m.UpdatePasswordModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
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
