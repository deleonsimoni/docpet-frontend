import { Component, OnInit } from '@angular/core';
import { LanguageDataApp } from './../../../common/datatable/language';
import { VeterinarioService } from './../../../services/veterinario.service';
import { Event, NavigationStart, Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import { Subject } from 'rxjs';
import { EsteticaService } from 'src/app/services/estetica.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  splitVal;
  base = 'estetica';
  page = 'Lista Estetica';
  esteticas: any = [];
  errorMessage: string;
  
  constructor(private router: Router, private esteticaService: EsteticaService) {
  
  }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language:LanguageDataApp.pt_br
    };
  
    this.getEsteticas();
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  getEsteticas() {
    this.esteticaService.getAll().subscribe(
      (res) => {
        this.esteticas = res;
        this.dtTrigger.next();
      },
      (error) => (this.errorMessage = <any>error)
    );
  }
  
  changeStatus(estetica){
    estetica.status = !estetica.status
    this.esteticaService.update(estetica._id, estetica).subscribe(
      () => {
        this.router.navigate(['/admin/list-estetica']);
      },
      (error) => {
        console.log(error);
      }
    );
  
  }
  
  }
  