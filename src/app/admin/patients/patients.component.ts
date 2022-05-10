import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../common-service.service'
import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
//import { GridApi,ColDef } from 'ag-grid-community';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ValueFormatterParams,
  CheckboxSelectionCallbackParams,
  FirstDataRenderedEvent,
  HeaderCheckboxSelectionCallbackParams,
  Grid,
  GridOptions,
  ModuleRegistry,
  PaginationNumberFormatterParams,
} from 'ag-grid-community';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  private gridApi!: GridApi;
  users: any = [];
  errorMessage: string;
  user;
  adm = '';
  adm_role = '';
  rowData: any = [];
  gridColumnApi;
  api;
  columnApi;
  onBtnClick;
  public paginationAutoPageSize = true;
  public paginationPageSize = 20;
  public rowSelection = 'single';
  public defaultColDef: ColDef = {
    editable: false,
    enableRowGroup: true,
    enablePivot: false,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 100,
  };
gridOptions;
myColDefs: ColDef[] = [
  { headerName: 'Nome',field: 'nome', sortable: true  },
  { headerName: 'Email',field: 'email', sortable: true },
  { headerName: 'Perfil',field: 'role' },
  { headerName: 'Data de Criação',field: 'createdAt', sortable: true },
  { headerName: 'Último Login',field: 'lastLogin', sortable: true },
  { 
    headerName: 'Admin?',
    field: 'isAdmin',
    cellRenderer: params => {
      // put the value in bold
      if (params.value == false){
        var val = "Não";
        var bt = "btn-warning";
        var par = true;
      }else{
        var val = "Sim";
        var bt = "btn-success";
        var par = false;
      }
      return '<button (click)="changeAdmin(user, '+par+')"  type="button" class="btn '+bt+'">' + val + '</button>';
  }
  }
];
  constructor(
    public commonService: CommonServiceService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    

    if (this.user.isAdmin) {
      this.getUsers();
      
      
    }
    
  }


  changeAdmin(user, isAdmin) {
    alert(isAdmin);
    this.userService.changeAdmin(user._id, isAdmin)
      .subscribe((res: any) => {

        this.getUsers();

        if (isAdmin) {
          this.toastrService.success('Usuário tornou-se administrador', 'Sucesso', {
            timeOut: 3000
          });
        } else {
          this.toastrService.warning('Usuário deixou de ser administrador', 'Sucesso', {
            timeOut: 3000
          });
        }

      }, error => {
        this.toastrService.error('Erro', 'Ops!', {
          timeOut: 3000
        });
      });



  }
  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
  // return this.paginationPageSize = Number(value);  
   this.gridApi.paginationSetPageSize(Number(value));
  }
  
  onGridReady = (params) => {
    this.api = params.api;
    this.columnApi = params.columnApi;
}
  onSelectionChanged(event) {
   
    const selectedRows = event.getSelectedRows();
    alert(selectedRows);
    (document.querySelector('#selectedRows') as any).innerHTML =
      selectedRows.length === 1 ? selectedRows[0].isAdmin : '';
  }
  getUsers() {
    this.spinner.show();
    this.userService.getUsers()
      .subscribe(res => {
        this.users = res.users.sort(function (a, b) {
          var dateA: any = new Date(a.createdAt);
          var dateB: any = new Date(b.createdAt);
          return (dateB - dateA)
        });
       for (let i = 0; i < this.users.length; i++) {
          
          if (this.users[i].role == '0'){
            this.adm_role = 'Usuário';
          }else if (this.users[i].role == '1'){
            this.adm_role = 'Veterinário';
          }else if (this.users[i].role == '2'){
            this.adm_role = 'Clinica';
          }else if (this.users[i].role == '3'){
            this.adm_role = 'Adestrador';
          }else if (this.users[i].role == '4'){
            this.adm_role = 'Estética';
          }
          this.rowData.push({"nome" : this.users[i].nome, "email" : this.users[i].email, "role" : this.adm_role, "createdAt" : this.users[i].createdAt, "lastLogin" : this.users[i].lastLogin, "isAdmin" : this.users[i].isAdmin});
         }
       // this.rowData = this.users;
        this.users = this.rowData;
        console.log(this.rowData);
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.errorMessage = <any>error
        });
  }

}
