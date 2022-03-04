import { Component, OnInit } from '@angular/core';
import { LanguageDataApp } from '../../../common/datatable/language';
import { Event, NavigationStart, Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import { Subject } from 'rxjs';
import { BlogService } from 'src/app/services/blog.service';
@Component({
  selector: 'app-blog-lista',
  templateUrl: './blog-lista.component.html',
  styleUrls: ['./blog-lista.component.css']
})
export class BlogListaComponent implements OnInit {

dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();

splitVal;
base = 'Blog';
page = 'Lista de Blogs';
blogs: any = [];
errorMessage: string;

constructor(private router: Router, private blogService: BlogService) {

}

ngOnInit(): void {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true,
    language:LanguageDataApp.pt_br
  };

  this.getAll();
}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

getAll() {
  this.blogService.getAll().subscribe(
    (res) => {
      this.blogs = res;
      this.dtTrigger.next();
    },
    (error) => (this.errorMessage = <any>error)
  );
 
}

changeStatus(blog){
  blog.status = !blog.status
  this.blogService.update(blog._id, blog).subscribe(
    () => {
      this.router.navigate(['/admin/list-blog']);
    },
    (error) => {
      console.log(error);
    }
  );
}

}
