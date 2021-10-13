import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-veterinario',
  templateUrl: './veterinario.component.html',
  styleUrls: ['./veterinario.component.css']
})
export class VeterinarioComponent implements OnInit {

  splitVal;
  url;
  base = 'Veterinário';
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
