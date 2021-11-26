import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormContatoComponent } from './form-contato.component';
import { FormContatoRoutingModule } from './form-contato-routing.module';

@NgModule({
  declarations: [FormContatoComponent],
  imports: [CommonModule, FormContatoRoutingModule],
})
export class FormContatoModule {}
