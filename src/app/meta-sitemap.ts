import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { data } from 'jquery';
import { Globals } from './global';
import { VeterinarioService } from './services/veterinario.service';
import { seoSitemap } from './seo-sitemap';
@Component({
    template: ''
  })
  export class SeoComponent implements OnInit {
    public doctors: any = [];
    public url = "";
    public tit = "";
    public dsc = "";
    public img = "";
    public mta = "";
    public arr: any = [];

    constructor(public veterinarioService: VeterinarioService) { }
    
    ngOnInit(): void {
        this.arr = seoSitemap;
      this.listarVeterinario();
      
    }
    listarVeterinario() {
      this.doctors = [];
      this.arr = seoSitemap;
      this.veterinarioService.getAll()
        .subscribe(
          data => {
            //this.doctors = data;
            this.doctors.forEach(data, function(dados){
              this.url = '/doctor/'+ dados.nome;
              this.tit = 'Consulta com '+dados.nome+'. Agende hoje sua consulta! | VetzCo';
              this.dsc = 'Seu PET está com problemas? precisa de uma consulta? Na VetzCo temos a especialista '+dados.nome+'. Agende hoje sua consulta!'
              this.mta = [{customUrl:this.url,title:this.tit,description:this.dsc,image:""}];
              if (!this.arr.indexOf({customUrl: this.url})){this.arr.push(this.mta);}
              
              
            });
          },
          error => {
            console.log(error);
          });
          console.log(this.arr); 
      
    }

  }