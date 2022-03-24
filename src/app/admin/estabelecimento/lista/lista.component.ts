import { LanguageDataApp } from './../../../common/datatable/language';
import { EstabelecimentoService } from './../../../services/estabelecimento.service';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})

export class ListaComponent implements OnInit, OnDestroy {

  //estabelecimentos$: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  splitVal;
  base = 'Estabelecimento';
  page = 'Lista de Estabelecimentos';
  estabelecimentos: any = [];
  errorMessage: string;

  constructor(private router: Router,private estabelecimentosevice: EstabelecimentoService, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language:LanguageDataApp.pt_br,
      "order": [[6, "asc"]],
      'columnDefs': [ { 'type': 'date', 'targets': 6 } ],
    };

    this.getEstabelecimentos();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getEstabelecimentos() {
    this.spinner.show();
    this.estabelecimentosevice.getAll().subscribe(
      (res) => {
        this.estabelecimentos = res;
        this.dtTrigger.next();
        this.spinner.hide();
      },
      (error) => {
        this.errorMessage = <any>error
         this.spinner.hide();
      }
    );
  }

  changeStatus(estabelecimento){
    estabelecimento.status = !estabelecimento.status
    this.estabelecimentosevice.update(estabelecimento._id, estabelecimento).subscribe(
      () => {
        this.router.navigate(['/admin/list-estabelecimento']);
      },
      (error) => {
        console.log(error);
      }
    );

  }
}
