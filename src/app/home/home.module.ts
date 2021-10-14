import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxSelectModule,
    FormsModule
  ]
})
export class HomeModule { }
