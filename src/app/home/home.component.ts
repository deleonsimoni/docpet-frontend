import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { INgxSelectOption } from 'ngx-select-ex';
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
    private especialidadeSevice: EspecialidadeService,
    private router: Router) { }

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


  normalizeNome(options: INgxSelectOption[]){
    if(options){

      options[0].text = options[0].data.nome;

    }

  }

  consultar(pesquisa){

    let filtro: any = this.especialidades.filter(e => e._id == pesquisa)[0];

    if(!filtro.type || filtro.type == 1){
      this.router.navigate([`/list/${filtro._id}`]);
    } else if(filtro.type == 2){
      //Veterinario
      this.router.navigate([`/doctor/${filtro.nome}/RioDeJaneiro`]);
    } else if(filtro.type == 3){
      //clinica
      this.router.navigate([`/detail/${filtro.nome}/RioDeJaneiro`]);
    }
  }

  listarCompleto(query) {
    this.especialidades = [];

    this.especialidadeSevice.getCompletedFind(query)
      .subscribe(
        data => {
          data.forEach(item => item.nomeFormated = item['nome'] + ' ' + item['nomeFormated'] + ' ' + this.createEdgeNGrams(item['nomeFormated']));
          this.especialidades = data;
        },
        error => {
          console.log(error);
        });
  }


  createEdgeNGrams(str) {
    if (str && str.length > 3) {
        const minGram = 3
        const maxGram = str.length

        return str.split(" ").reduce((ngrams, token) => {
            if (token.length > minGram) {
                for (let i = minGram; i <= maxGram && i <= token.length; ++i) {
                    ngrams = [...ngrams, token.substr(0, i)]
                }
            } else {
                ngrams = [...ngrams, token]
            }
            return ngrams
        }, []).join(" ")
    }

    return str
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
