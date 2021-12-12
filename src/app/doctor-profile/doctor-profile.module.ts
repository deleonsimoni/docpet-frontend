import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorProfileRoutingModule } from './doctor-profile-routing.module';
import { DoctorProfileComponent } from './doctor-profile.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DoctorProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    DoctorProfileRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC39y1TCyvZP0bU7Pur_SBfySWjSy5qhEg'
    }),
  ]
})
export class DoctorProfileModule { }
