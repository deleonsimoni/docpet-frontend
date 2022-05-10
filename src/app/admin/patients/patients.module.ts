import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [PatientsComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    AgGridModule,
    DataTablesModule
  ]
})
export class PatientsModule { }
