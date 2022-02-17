import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './plan-routing.module';
import { PlanComponent } from './plan.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [PlanComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    SlickCarouselModule
  ]
})
export class PlanModule { }
