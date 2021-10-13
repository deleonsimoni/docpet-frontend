

import { MensagemModule } from './../../componentes/mensagem/mensagem.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CadastroVeterinarioRoutingModule } from './cadastro-veterinario-routing.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularTagsInputModule } from '@iomechs/angular-tags-input';
import { CadastroVeterinarioComponent } from './cadastro-veterinario.component';
import { NgxMaskModule} from 'ngx-mask'

@NgModule({
  declarations: [CadastroVeterinarioComponent],
  imports: [
    CommonModule,
    CadastroVeterinarioRoutingModule,
	  NgxDropzoneModule,
	  AngularTagsInputModule,
    FormsModule,
    NgSelectModule,
    MensagemModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()

  ]
})
export class CadastroVeterinarioModule { }
