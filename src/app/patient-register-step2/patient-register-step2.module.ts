import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRegisterStep2RoutingModule } from './patient-register-step2-routing.module';
import { PatientRegisterStep2Component } from './patient-register-step2.component';


@NgModule({
  declarations: [PatientRegisterStep2Component],
  imports: [
    CommonModule,
    PatientRegisterStep2RoutingModule
  ]
})
export class PatientRegisterStep2Module { }
