import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyAdminRoutingModule } from './pharmacy-admin-routing.module';
import { PharmacyAdminComponent } from './pharmacy-admin.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PharmacyAdminComponent, SidemenuComponent],
  imports: [
    CommonModule,
    PharmacyAdminRoutingModule,
    NgbModule,
    ModalModule.forRoot()
  ]
})
export class PharmacyAdminModule { }
