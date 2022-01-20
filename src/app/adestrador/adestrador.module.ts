import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdestradorRoutingModule } from './adestrador-routing.module';
import { AdestradorComponent } from './adestrador.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdestradorComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdestradorRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC39y1TCyvZP0bU7Pur_SBfySWjSy5qhEg'
    }),
  ]
})
export class AdestradorModule { }
