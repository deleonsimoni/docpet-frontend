import { Component, OnInit } from '@angular/core';
import { LanguageDataApp } from './../../common/datatable/language';
import { VeterinarioService } from './../../services/veterinario.service';
import { Event, NavigationStart, Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import { Subject } from 'rxjs';
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

constructor(private router: Router, private veterinarioSevice: VeterinarioService) {

}

ngOnInit(): void {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true,
    language:LanguageDataApp.pt_br
  };

  this.getVeterinarios();
}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

getVeterinarios() {
  this.veterinarioSevice.getAll().subscribe(
    (res) => {
      console.log(res);
      this.veterinarios = res;
      this.dtTrigger.next();
    },
    (error) => (this.errorMessage = <any>error)
  );
}

changeStatus(veterinario){
  veterinario.status = !veterinario.status
  this.veterinarioSevice.update(veterinario._id, veterinario).subscribe(
    () => {
      this.router.navigate(['/veterinario/lista/']);
    },
    (error) => {
      console.log(error);
    }
  );

}

}
