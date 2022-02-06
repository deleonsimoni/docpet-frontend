import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-plano',
  templateUrl: './plano.component.html',
})
export class PlanoComponent implements OnInit {

  splitVal;
  url;
  base = 'Plano';
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
