import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [AdminComponent, SidemenuComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    AgGridModule,
    ModalModule.forRoot(),
  ],
})
export class AdminModule {}
