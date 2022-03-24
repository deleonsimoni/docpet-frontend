import { Component, OnInit } from '@angular/core';
import { LanguageDataApp } from './../../../common/datatable/language';
import { VeterinarioService } from './../../../services/veterinario.service';
import { Event, NavigationStart, Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import { Subject } from 'rxjs';
import { EsteticaService } from 'src/app/services/estetica.service';
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
  base = 'estetica';
  page = 'Lista Estetica';
  esteticas: any = [];
  errorMessage: string;
  
  constructor(private router: Router, private esteticaService: EsteticaService, private spinner: NgxSpinnerService) {
  
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
  
    this.getEsteticas();
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  getEsteticas() {
    this.spinner.show();
    this.esteticaService.getAll().subscribe(
      (res) => {
        this.esteticas = res;
        this.dtTrigger.next();
        this.spinner.hide();
      },
      (error) => {
        this.errorMessage = <any>error
        this.spinner.hide();
      }
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
  