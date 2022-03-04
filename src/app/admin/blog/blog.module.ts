

import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogComponent } from './blog.component';




@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    NgbModule,
    BlogRoutingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogModule { }
