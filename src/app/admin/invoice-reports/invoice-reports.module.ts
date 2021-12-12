import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { InvoiceReportsRoutingModule } from './invoice-reports-routing.module';
import { InvoiceReportsComponent } from './invoice-reports.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [InvoiceReportsComponent],
  imports: [
    CommonModule,
    InvoiceReportsRoutingModule,
    DataTablesModule,
    FormsModule,
  ]
})
export class InvoiceReportsModule { }
