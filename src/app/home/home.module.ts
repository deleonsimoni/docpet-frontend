import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule } from '@angular/forms';
import { MensagemModule } from '../componentes/mensagem/mensagem.module';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxSelectModule,
    MensagemModule,
    ToastrModule.forRoot(),
    FormsModule
  ]
})
export class HomeModule { }
