import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {

  splitVal;
  url;
  base = 'Blog';
  page = 'Lista';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        if(this.splitVal[2]){
          this.page = this.splitVal[2];
        }else{
          this.page ='Lista';
        }
      }
    });
  }

}
