

import { MensagemModule } from '../../componentes/mensagem/mensagem.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { ListaRoutingModule } from './lista-veterinario-routing.module';
import { ListaVeterinarioComponent } from './lista-veterinario.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularTagsInputModule } from '@iomechs/angular-tags-input';

@NgModule({
  declarations: [ListaVeterinarioComponent],
  imports: [
    CommonModule,
    ListaRoutingModule,
	  NgxDropzoneModule,
	  AngularTagsInputModule,
    FormsModule,
    NgSelectModule,
    MensagemModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class ListaModule { }
