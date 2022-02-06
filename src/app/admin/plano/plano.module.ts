

import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanoRoutingModule } from './plano-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlanoComponent } from './plano.component';




@NgModule({
  declarations: [PlanoComponent],
  imports: [
    CommonModule,
    NgbModule,
    PlanoRoutingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlanoModule { }
