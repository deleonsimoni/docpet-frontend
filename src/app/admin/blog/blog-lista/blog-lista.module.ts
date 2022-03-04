

import { MensagemModule } from '../../../componentes/mensagem/mensagem.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { BlogListaRoutingModule } from './blog-lista-routing.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularTagsInputModule } from '@iomechs/angular-tags-input';
import { BlogListaComponent } from './blog-lista.component';

@NgModule({
  declarations: [BlogListaComponent],
  imports: [
    CommonModule,
    BlogListaRoutingModule,
	  NgxDropzoneModule,
	  AngularTagsInputModule,
    FormsModule,
    NgSelectModule,
    MensagemModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class BlogListaModule { }
