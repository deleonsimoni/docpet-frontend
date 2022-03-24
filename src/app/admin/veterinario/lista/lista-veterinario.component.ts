import { Component, OnInit } from '@angular/core';
import { LanguageDataApp } from './../../../common/datatable/language';
import { VeterinarioService } from './../../../services/veterinario.service';
import { Event, NavigationStart, Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-lista-veterinario',
  templateUrl: './lista-veterinario.component.html',
  styleUrls: ['./lista-veterinario.component.css']
})
export class ListaVeterinarioComponent implements OnInit {

dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();

splitVal;
base = 'Veterinário';
page = 'Lista de Veterinários';
veterinarios: any = [];
errorMessage: string;



constructor(private router: Router, private veterinarioSevice: VeterinarioService, private spinner: NgxSpinnerService) {

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

  this.getVeterinarios();
}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

getVeterinarios() {
  this.spinner.show();
  this.veterinarioSevice.getAll().subscribe(
    (res) => {
      this.veterinarios = res;
      this.dtTrigger.next();
      this.spinner.hide();
    },
    (error) => {
      this.spinner.hide();
      this.errorMessage = <any>error
    }
  );
}

changeStatus(veterinario){
  veterinario.status = !veterinario.status
  this.veterinarioSevice.update(veterinario._id, veterinario).subscribe(
    () => {
      this.router.navigate(['/admin/list-veterinario']);
    },
    (error) => {
      console.log(error);
    }
  );

}

}
