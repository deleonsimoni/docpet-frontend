import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularTagsInputModule } from '@iomechs/angular-tags-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MensagemModule } from 'src/app/componentes/mensagem/mensagem.module';
import { AgmCoreModule } from '@agm/core';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path : '',
		component : CadastroComponent
	}
];

@NgModule({
  declarations: [CadastroComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
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
    NgxMaskModule.forChild()
  ],
  exports: [RouterModule]
})
export class CadastroModule { }
