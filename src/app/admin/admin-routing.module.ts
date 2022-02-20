import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'dashboard-admin',
        loadChildren: () =>
          import('./dashboard-admin/dashboard-admin.module').then((m) => m.DashboardAdminModule),
      },
      {
        path: 'dashboard-clinica',
        loadChildren: () =>
          import('./estabelecimento/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      
      {
        path: 'list-user',
        loadChildren: () =>
          import('./dashboard-admin/dashboard-admin.module').then((m) => m.DashboardAdminModule),
      },
      {
        path: 'list-veterinario',
        loadChildren: () =>
          import('./veterinario/lista/lista-veterinario.module').then((m) => m.ListaModule),
      },
      {
        path: 'cadastro-veterinario',
        loadChildren: () =>
          import('./veterinario/cadastro/cadastro-veterinario.module').then((m) => m.CadastroVeterinarioModule),
      },
      {
        path: 'cadastro-veterinario/:id',
        loadChildren: () =>
          import('./veterinario/cadastro/cadastro-veterinario.module').then((m) => m.CadastroVeterinarioModule),
      },


      {
        path: 'list-adestrador',
        loadChildren: () =>
          import('./adestrador/lista/lista.module').then((m) => m.ListaModule),
      },
      {
        path: 'cadastro-adestrador/:id',
        loadChildren: () =>
          import('./adestrador/cadastro/cadastro.module').then((m) => m.CadastroModule),
      },
      {
        path: 'cadastro-adestrador',
        loadChildren: () =>
          import('./adestrador/cadastro/cadastro.module').then((m) => m.CadastroModule),
      },
      {
        path: 'dashboard-adestrador',
        loadChildren: () =>
          import('./adestrador/dashboard-adestrador/dashboard-adestrador.module').then((m) => m.DashboardAdestradorModule),
      },
      {
        path: 'list-estetica',
        loadChildren: () =>
          import('./estetica/lista/lista.module').then((m) => m.ListaModule),
      },
      {
        path: 'cadastro-estetica/:id',
        loadChildren: () =>
          import('./estetica/cadastro/cadastro.module').then((m) => m.CadastroModule),
      },
      {
        path: 'cadastro-estetica',
        loadChildren: () =>
          import('./estetica/cadastro/cadastro.module').then((m) => m.CadastroModule),
      },
      {
        path: 'dashboard-estetica',
        loadChildren: () =>
          import('./estetica/dashboard-estetica/dashboard-estetica.module').then((m) => m.DashboardEsteticaModule),
      },

      {
        path: 'list-plano',
        loadChildren: () =>
          import('./plano/lista/lista.module').then((m) => m.ListaModule),
      },
      {
        path: 'cadastro-plano',
        loadChildren: () =>
          import('./plano/cadastro/cadastro.module').then((m) => m.CadastroModule),
      },
      {
        path: 'cadastro-plano/:id',
        loadChildren: () =>
          import('./plano/cadastro/cadastro.module').then((m) => m.CadastroModule),
      },

      {
        path: 'list-estabelecimento',
        loadChildren: () =>
          import('./estabelecimento/lista/lista.module').then((m) => m.ListaModule),
      },
      {
        path: 'cadastro-estabelecimento',
        loadChildren: () =>
          import('./estabelecimento/cadastro/cadastro.module').then((m) => m.CadastroModule),
      },
      {
        path: 'cadastro-estabelecimento/:id',
        loadChildren: () =>
          import('./estabelecimento/cadastro/cadastro.module').then((m) => m.CadastroModule),
      },


      {
        path: 'forgot-pass',
        loadChildren: () =>
          import(
            './pages/authendication/forgot-password/forgot-password.module'
          ).then((m) => m.ForgotPasswordModule),
      },
      {
        path: 'login-form',
        loadChildren: () =>
          import('./pages/authendication/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
      {
        path: 'admin-invoice',
        loadChildren: () =>
          import('./invoice/admin-invoice.module').then(
            (m) => m.AdminInvoiceModule
          ),
      },
      {
        path: 'doc-profile',
        loadChildren: () =>
          import('./doc-profile/doc-profile.module').then(
            (m) => m.DocProfileModule
          ),
      },
      {
        path: 'lock-screen',
        loadChildren: () =>
          import('./pages/authendication/lock-screen/lock-screen.module').then(
            (m) => m.LockScreenModule
          ),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./pages/authendication/regiser/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: 'blank-page',
        loadChildren: () =>
          import('./pages/blank-page/blank-page.module').then(
            (m) => m.BlankPageModule
          ),
      },
      {
        path: 'error-first',
        loadChildren: () =>
          import('./pages/error-pages/error-first/error-first.module').then(
            (m) => m.ErrorFirstModule
          ),
      },
      {
        path: 'error-second',
        loadChildren: () =>
          import('./pages/error-pages/error-second/error-second.module').then(
            (m) => m.ErrorSecondModule
          ),
      },
      {
        path: 'components',
        loadChildren: () =>
          import('./ui-interface/components/components.module').then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: 'basic-input',
        loadChildren: () =>
          import('./ui-interface/forms/basic-inputs/basic-inputs.module').then(
            (m) => m.BasicInputsModule
          ),
      },
      {
        path: 'form-validation',
        loadChildren: () =>
          import(
            './ui-interface/forms/form-validation/form-validation.module'
          ).then((m) => m.FormValidationModule),
      },
      {
        path: 'horizondal-form',
        loadChildren: () =>
          import(
            './ui-interface/forms/horizondal-form/horizondal-form.module'
          ).then((m) => m.HorizondalFormModule),
      },
      {
        path: 'input-groups',
        loadChildren: () =>
          import('./ui-interface/forms/input-groups/input-groups.module').then(
            (m) => m.InputGroupsModule
          ),
      },
      {
        path: 'vertical-form',
        loadChildren: () =>
          import(
            './ui-interface/forms/vertical-form/vertical-form.module'
          ).then((m) => m.VerticalFormModule),
      },
      {
        path: 'form-mask',
        loadChildren: () =>
          import('./ui-interface/forms/form-mask/form-mask.module').then(
            (m) => m.FormMaskModule
          ),
      },
      {
        path: 'basic-tables',
        loadChildren: () =>
          import('./ui-interface/tables/basic-tables/basic-tables.module').then(
            (m) => m.BasicTablesModule
          ),
      },
      {
        path: 'admin-data-table',
        loadChildren: () =>
          import(
            './ui-interface/tables/admin-data-table/admin-data-table.module'
          ).then((m) => m.AdminDataTableModule),
      },
      {
        path: 'appointment',
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'specialities',
        loadChildren: () =>
          import('./specialities/specialities.module').then(
            (m) => m.SpecialitiesModule
          ),
      },
      {
        path: 'product-list',
        loadChildren: () =>
          import('./product-list/product-list.module').then((m) => m.ProductListModule),
      },
      {
        path: 'pharmacy-list',
        loadChildren: () =>
          import('./pharmacy-list/pharmacy-list.module').then((m) => m.PharmacyListModule),
      },
      {
        path: 'doctor',
        loadChildren: () =>
          import('./doctors/doctors.module').then((m) => m.DoctorsModule),
      },
      {
        path: 'patients',
        loadChildren: () =>
          import('./patients/patients.module').then((m) => m.PatientsModule),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./transactions/transactions.module').then(
            (m) => m.TransactionsModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'reviews',
        loadChildren: () =>
          import('./reviews/reviews.module').then((m) => m.ReviewsModule),
      },
      {
        path: 'invoice-reports',
        loadChildren: () =>
          import('./invoice-reports/invoice-reports.module').then(
            (m) => m.InvoiceReportsModule
          ),
      },

      {
        path: 'servicos',
        loadChildren: () =>
          import('./servico/servico.module').then(
            (m) => m.InvoiceReportsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
