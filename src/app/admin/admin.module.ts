import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AdminComponent, SidemenuComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    ModalModule.forRoot(),
  ],
})
export class AdminModule {}
