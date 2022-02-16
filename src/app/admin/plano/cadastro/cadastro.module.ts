

import { MensagemModule } from '../../../componentes/mensagem/mensagem.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CadastroRoutingModule } from './cadastro-routing.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularTagsInputModule } from '@iomechs/angular-tags-input';
import { CadastroComponent } from './cadastro.component';
import { NgxMaskModule} from 'ngx-mask'
import { AgmCoreModule } from '@agm/core';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";

export const customCurrencyMaskConfig = {
  align: null,
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};


@NgModule({
  declarations: [CadastroComponent],
  imports: [
    CommonModule,
    CadastroRoutingModule,
	  NgxDropzoneModule,
	  AngularTagsInputModule,
    FormsModule,
    NgSelectModule,
    MensagemModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC39y1TCyvZP0bU7Pur_SBfySWjSy5qhEg'
    }),
    MensagemModule,
    ReactiveFormsModule,

    NgxMaskModule.forChild(),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)

  ]
})
export class CadastroModule { }
