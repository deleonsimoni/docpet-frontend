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
    path: 'clinic/:nome',
    loadChildren: () => import('./clinic-profile/clinic-profile.module').then((m) => m.ClinicProfileModule),
  },
  {
    path: 'trainer/:nome/:municipio',
    loadChildren: () => import('./trainer-profile/trainer-profile.module').then((m) => m.TrainerProfileModule),
  },
  {
    path: 'aesthetics/:nome/:municipio',
    loadChildren: () => import('./aesthetics-profile/aesthetics-profile.module').then((m) => m.AestheticsProfileModule),
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./form-contato/form-contato.module').then((m) => m.FormContatoModule),
  },
  {
    path: 'registro',
    loadChildren: () =>
    import('./register/register.module').then((m) => m.RegisterModule),
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
    path: 'politica-privacidade',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
    import('./blog-grid/blog-grid.module').then((m) => m.BlogGridModule),
  },
  {
    path: 'blog/:especialidade',
    loadChildren: () =>
    import('./blog-grid/blog-grid.module').then((m) => m.BlogGridModule),
  },
  {
    path: 'blog-detalhe/:titulo',
    loadChildren: () =>
    import('./blog-details/blog-details.module').then((m) => m.BlogDetailsModule),
  },
  {
    path: 'planos',
    loadChildren: () => import('./plan/plan.module').then((m) => m.PlanModule),
  },
  {
    path: 'plano-pagamento/:nome',
    loadChildren: () => import('./checkout/checkout.module').then((m) => m.CheckoutModule),
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
