import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ServicoRoutingModule } from './servico-routing.module';
import { ServicoComponent } from './servico.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ServicoComponent],
  imports: [
    CommonModule,
    ServicoRoutingModule,
    DataTablesModule,
    FormsModule,
  ]
})
export class InvoiceReportsModule { }
