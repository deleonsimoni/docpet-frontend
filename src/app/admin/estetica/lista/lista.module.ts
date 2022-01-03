import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularTagsInputModule } from '@iomechs/angular-tags-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MensagemModule } from 'src/app/componentes/mensagem/mensagem.module';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path : '',
		component : ListaComponent
	}
];

@NgModule({
  declarations: [ListaComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
	  NgxDropzoneModule,
	  AngularTagsInputModule,
    FormsModule,
    NgSelectModule,
    MensagemModule,
    RouterModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  exports: [RouterModule]
})
export class ListaModule { }
