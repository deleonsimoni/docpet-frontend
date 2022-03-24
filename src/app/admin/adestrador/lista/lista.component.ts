import { Component, OnInit } from '@angular/core';
import { LanguageDataApp } from './../../../common/datatable/language';
import { VeterinarioService } from './../../../services/veterinario.service';
import { Event, NavigationStart, Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import { Subject } from 'rxjs';
import { AdestradorService } from 'src/app/services/adestrador.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();

splitVal;
base = 'Adestradores';
page = 'Lista de Adestradores';
adestradores: any = [];
errorMessage: string;

constructor(private router: Router, private adestradorService: AdestradorService, private spinner: NgxSpinnerService) {

}

ngOnInit(): void {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true,
    language:LanguageDataApp.pt_br,
    "order": [[5, "asc"]],
    'columnDefs': [ { 'type': 'date', 'targets': 5 } ],
  };

  this.getAdestradores();
}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

getAdestradores() {
  this.spinner.show();
  this.adestradorService.getAll().subscribe(
    (res) => {
      this.adestradores = res;
      this.dtTrigger.next();
      this.spinner.hide();
    },
    (error) => {
      this.errorMessage = <any>error
      this.spinner.hide();
    }
  );
}

changeStatus(adestrador){
  adestrador.status = !adestrador.status
  this.adestradorService.update(adestrador._id, adestrador).subscribe(
    () => {
      this.router.navigate(['/admin/list-adestrador']);
    },
    (error) => {
      console.log(error);
    }
  );

}

}
