import { BrowserModule, Meta } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { Daterangepicker } from 'ng2-daterangepicker';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgSelect2Module } from 'ng-select2';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgxMaskModule } from 'ngx-mask';
import { NgxSelectModule } from 'ngx-select-ex';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { InterceptorService } from './services/interceptor.service';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
    NgxMaskModule.forRoot({ dropSpecialCharacters: false }),
    LeafletModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: [HTTP_INTERCEPTORS, Meta],
      useClass: InterceptorService,
      multi: true,
     
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
