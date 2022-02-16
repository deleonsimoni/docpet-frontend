import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { Daterangepicker } from 'ng2-daterangepicker';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgSelect2Module } from 'ng-select2';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgxMaskModule} from 'ngx-mask';
import { NgxSelectModule } from 'ngx-select-ex';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlickCarouselModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    NgSelectModule,
    NgxSelectModule,
    NgbModule,
    Daterangepicker,
    NgSelect2Module,
    NgApexchartsModule,
    NgxMaskModule.forRoot({dropSpecialCharacters:false}),
    LeafletModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
