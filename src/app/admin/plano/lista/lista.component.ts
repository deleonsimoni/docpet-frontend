import { Component, OnInit } from '@angular/core';
import { LanguageDataApp } from '../../../common/datatable/language';
import { Event, NavigationStart, Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import { Subject } from 'rxjs';
import { PlanoService } from 'src/app/services/plano.service';
@Component({
  selector: 'app-lista-veterinario',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();

splitVal;
base = 'Plano';
page = 'Lista de Planos';
planos: any = [];
errorMessage: string;

constructor(private router: Router, private planoService: PlanoService) {

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
  this.planoService.getAll().subscribe(
    (res) => {
      this.planos = res;
      this.dtTrigger.next();
    },
    (error) => (this.errorMessage = <any>error)
  );
 
}

changeStatus(plano){
  plano.status = !plano.status
  this.planoService.update(plano._id, plano).subscribe(
    () => {
      this.router.navigate(['/admin/list-plano']);
    },
    (error) => {
      console.log(error);
    }
  );
}

}
