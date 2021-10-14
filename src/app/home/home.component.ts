import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { EspecialidadeService } from '../services/especialidades.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public especialidades: any[];
  public cidades: any[] = ['Rio de Janeiro'];

  public especialidadeEscolhida: any = [];
  public cidadeEscolhida: any = [];

  public ngxDisabled = false;


  constructor(
    private especialidadeSevice: EspecialidadeService) { }

  ngOnInit(): void {
    this.listarEspecialidades();
  }

  inputTyped(text: string){
    if(text.length){
      this.listarCompleto(text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    } else {
      this.listarEspecialidades();
    }
  }

  consultar(pesquisa){
    let filtro: any = this.especialidades.filter(e => e._id == pesquisa);

    if(!filtro.type || filtro.type == 1){
      //Especialidade

    } else if(filtro.type == 2){
      //Veterinario

    } else if(filtro.type == 3){
      //clinica

    }
  }

  listarCompleto(query) {
    this.especialidades = [];

    this.especialidadeSevice.getCompletedFind(query)
      .subscribe(
        data => {
          data.forEach(item => item.nomeFormated = item['nome'] + ' ' + item['nomeFormated']);
          this.especialidades = data;
        },
        error => {
          console.log(error);
        });
  }

  listarEspecialidades() {

    this.especialidadeSevice.getAll()
      .subscribe(
        data => {
          this.especialidades = data;
        },
        error => {
          console.log(error);
        });
  }

}
