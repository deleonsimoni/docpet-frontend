

import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstabelecimentoRoutingModule } from './estabelecimento-routing.module';
import { EstabelecimentoComponent } from './estabelecimento.component';




@NgModule({
  declarations: [EstabelecimentoComponent],
  imports: [
    CommonModule,
    EstabelecimentoRoutingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EstabelecimentoModule { }
