import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormContatoComponent } from './form-contato.component';
import { FormContatoRoutingModule } from './form-contato-routing.module';
import { MensagemModule } from '../componentes/mensagem/mensagem.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AgmCoreModule } from '@agm/core';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [FormContatoComponent],
  imports: [
    CommonModule,
    FormContatoRoutingModule,
    MensagemModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    NgSelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC39y1TCyvZP0bU7Pur_SBfySWjSy5qhEg'
    }),

  ],
})
export class FormContatoModule {}
