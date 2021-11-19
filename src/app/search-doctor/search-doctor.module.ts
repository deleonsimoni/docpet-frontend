import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchDoctorRoutingModule } from './search-doctor-routing.module';
import { SearchDoctorComponent } from './search-doctor.component';
import { NgSelect2Module } from 'ng-select2';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AgmCoreModule } from '@agm/core';

//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
//import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [SearchDoctorComponent],
  imports: [
    NgSelect2Module,
    CommonModule,
    SearchDoctorRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC39y1TCyvZP0bU7Pur_SBfySWjSy5qhEg'
    }),
    //NgbModule,
    //CrystalLightboxModule,
    //TooltipModule,
  ],
})
export class SearchDoctorModule {}
