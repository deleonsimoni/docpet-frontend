import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerProfileRoutingModule } from './trainer-profile-routing.module';
import { TrainerProfileComponent } from './trainer-profile.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TrainerProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    TrainerProfileRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC39y1TCyvZP0bU7Pur_SBfySWjSy5qhEg'
    }),
  ]
})
export class TrainerProfileModule { }
