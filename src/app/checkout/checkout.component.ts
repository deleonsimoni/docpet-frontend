import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { UserService } from '../services/user.service';
import { PlanoService } from '../services/plano.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  userLogged;
  urlatual: any = [];
  pathImage;
  titulo;
  nomeUser;
  sobrenome;
  email;
  celular;
  dadosUser;
  planos: any = [];
  free : boolean;

  constructor(
    public router: Router,
    public commonService: CommonServiceService,
    private userService: UserService,
    private planosService: PlanoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.userLogged = this.userService.getUser();
    var urls  = window.location.href; 
    this.pathImage = "http://www.gugaweigert.com.br/vetzcoImagens/";
    this.urlatual = urls.split('/');
    this.titulo = this.urlatual[4];
    if (this.titulo == "basico"){
      this.free = true;
    }else{
      this.free = false;
    }
    this.dadosUser = this.userLogged.login.split(' ');
    console.log("nome: "+this.titulo);
    for (let i = 0; i < this.dadosUser.length; i++) {
      if (i == (this.dadosUser.length - 1)){
        this.sobrenome = this.dadosUser[i];
      }else{
        if (i == 0){
          this.nomeUser = this.dadosUser[i];
        }else{
          this.nomeUser = this.nomeUser +' '+this.dadosUser[i];
        }
        
      }
    }
    this.getDataPlano(this.titulo);
    
  }
  getDataPlano(titulo){
    this.planosService.getByName(titulo).subscribe(
      (res) => {
        this.planos = res[0];
        console.log(res[0]);
      },
      error => {
        console.log(error);
        this.toastr.warning('Não foi possível efetuar a busca de planos', 'Atenção!');
        return;

      }
    );
  }
}
