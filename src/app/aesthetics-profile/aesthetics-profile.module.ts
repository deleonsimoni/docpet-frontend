import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AestheticsProfileRoutingModule } from './aesthetics-profile-routing.module';
import { AestheticsProfileComponent } from './aesthetics-profile.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AestheticsProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    AestheticsProfileRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC39y1TCyvZP0bU7Pur_SBfySWjSy5qhEg'
    }),
  ]
})
export class AestheticsProfileModule { }
