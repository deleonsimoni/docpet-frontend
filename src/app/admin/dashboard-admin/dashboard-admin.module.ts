import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordModule } from 'src/app/forgot-password/forgot-password.module';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';



@NgModule({
  declarations: [DashboardAdminComponent],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule,
    ForgotPasswordModule,
    // MorrisJsModule,
  ]
})
export class DashboardAdminModule { }
