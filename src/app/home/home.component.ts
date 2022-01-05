import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { INgxSelectOption } from 'ngx-select-ex';
import { ToastrService } from 'ngx-toastr';
import { CEPService } from '../services/cep.service';
import { DashboardService } from '../services/dashboard.service';
import { EspecialidadeService } from '../services/especialidades.service';
import { Globals } from '../global';
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
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.listarEspecialidades();
    this.listarEspecialidadesTotal();
    this.dashboardService.markAccess().subscribe(
      (counts: any) => {
       console.log('access');
      },
      (error) => {
        console.log(error);
      }
    );
    this.places=[
      {"description":"São Paulo", "placeId":"ChIJ0WGkg4FEzpQRrlsz_whLqZs"},
      {"description":"Rio de Janeiro", "placeId":"ChIJW6AIkVXemwARTtIvZ2xC3FA"},
      {"description":"Brasília", "placeId":"ChIJ1wSIEPI6WpMRVlAUyZAjuj4"},
      {"description":"Salvador", "placeId":"ChIJvS5CUCARFgcRndtzlTaEHPc"},
      {"description":"Fortaleza", "placeId":"ChIJP3hMRj9MxwcRyjdrDArGYUY"},
      {"description":"Belo Horizonte", "placeId":"ChIJMyzPysqQpgARlznSOl55NVs"},
      {"description":"Manaus", "placeId":"ChIJt0d2s8gbbJIRzKll959cSCs"},
      {"description":"Curitiba", "placeId":"ChIJ3bPNUVPj3JQRCejLuqVrL20"},
      {"description":"Recife", "placeId":"ChIJi0DllG8ZqwcRpuO9gvcOgOU"},
      {"description":"Goiânia", "placeId":"ChIJZwjYWL32XpMRjmfSIK0rae8"},
      {"description":"Belém", "placeId":"ChIJ4Wx1hK9hpJIRNUyGFQJUDVc"},
      {"description":"Porto Alegre", "placeId":"ChIJHctqVtKcGZURH-mHn6gRMWA"},
      //{"description":"Guarulhos", "placeId":"ChIJbeK1sT_1zpQRW1XDIo3hTJc"},
      //{"description":"Campinas", "placeId":"ChIJJWNL5x3GyJQRKsJ4IWo65Rc"},
      {"description":"São Luís", "placeId":"ChIJIW1_b_CP9gcRR96jWeQCMZg"},
    ];
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
    let tipo = 0;
    if (options) {
      tipo = options[0].data.type;
      options[0].text = options[0].data.nome;

    }

    if (tipo == 2) {
      //Veterinario
      this.router.navigate([`/doctor/${options[0].text}`]);
    } else if (tipo == 3) {
      //clinica
      this.router.navigate([`/detail/${options[0].text}`]);
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
        Globals['DESC_SEARCH_DOCTOR'] = filtro.nome+' - '+this.cidadeEscolhida;
      } else if (filtro.type == 2) {
        //Veterinario
        Globals['DOCTOR_URL'] = filtro.nome;
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

  getURLImgEspc(nome){
    return 'assets/img/shapes/'+nome+'.png';
  }





}
