import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { INgxSelectOption } from 'ngx-select-ex';
import { ToastrService } from 'ngx-toastr';
import { CEPService } from '../services/cep.service';
import { EspecialidadeService } from '../services/especialidades.service';
//import {} from 'googlemaps';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public especialidades: any[];
  public especialidadesTotal: any[];

  public places: any[];

  public especialidadeEscolhida: any = [];
  public cidadeEscolhida: any = [];
  isload = false;
  public ngxDisabled = false;
  autocompleteInput: string;
  queryWait: boolean;

  constructor(
    private especialidadeSevice: EspecialidadeService,
    private cepService: CEPService,

    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.listarEspecialidades();
    this.listarEspecialidadesTotal();
  }

  inputTyped(text: string) {
    if (text.length) {
      this.listarCompleto(text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    } else {
      this.listarEspecialidades();
    }
  }

  searchLocale(text: string) {
    if (text.length > 3) {
      this.cepService.getPlace(text)
        .subscribe(
          data => {
            this.places = data;
          },
          error => {
            console.log(error);
          });
    }

  }

  normalizeNome(options: INgxSelectOption[]) {
    if (options) {

      options[0].text = options[0].data.nome;

    }

  }

  consultar(pesquisa) {

    if (this.especialidadeEscolhida?.length == 0) {
      this.toastr.warning('Preencha o campo especialidade!', 'Atenção!');
      return;
    }

    if (this.cidadeEscolhida?.length == 0) {
      this.toastr.warning('Preencha o campo cidade!', 'Atenção!');
      return;
    }

    this.isload = true;
    let filtro: any = this.especialidades.filter(e => e._id == pesquisa)[0];

    setTimeout(() => {
      if (!filtro.type || filtro.type == 1) {
        this.router.navigate([`/list/${filtro._id}/${this.cidadeEscolhida}`]);
      } else if (filtro.type == 2) {
        //Veterinario
        this.router.navigate([`/doctor/${filtro.nome}`]);
      } else if (filtro.type == 3) {
        //clinica
        this.router.navigate([`/detail/${filtro.nome}`]);
      }
    }, 3000);

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
  listarEspecialidadesTotal() {

    this.especialidadeSevice.getAllTotalEspcEstab()
      .subscribe(
        data => {
          this.especialidadesTotal = data;
        },
        error => {
          console.log(error);
        });
  }





}
