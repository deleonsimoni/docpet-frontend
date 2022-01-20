import { VeterinarioService } from './../services/veterinario.service';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { INgxSelectOption } from 'ngx-select-ex';
import { ToastrService } from 'ngx-toastr';
import { CEPService } from '../services/cep.service';
import { DashboardService } from '../services/dashboard.service';
import { EspecialidadeService } from '../services/especialidades.service';
import { EstabelecimentoService } from '../services/estabelecimento.service';
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

  public totalListaEspecialidade : any[];
  public showTotalEspecialidade = 6; 

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
    private router: Router,
    private veterinarioService: VeterinarioService,
    private estabelecimentoService: EstabelecimentoService) { }

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
      console.log(text);
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
    console.log('tipo: '+tipo);
    if (tipo == 2) {
      //Veterinario
      this.veterinarioService.get(options[0].data._id).subscribe(
        data => {
          const urlFomatada = this.formataUrl(data);
          if(!urlFomatada){
            this.toastr.warning('Não foi possível efetuar a busca', 'Atenção!');
            console.log("Erro ao efetuar a busca. Nome, Especialidade ou Endereço não encontrado");
            return;
          }else{
            Globals['DOCTOR_URL'] = urlFomatada;
            this.router.navigate([`/doctor/${urlFomatada}`]);
          }
        },
        error => {
          console.log(error);
          this.toastr.warning('Não foi possível efetuar a busca', 'Atenção!');
          return;

        });


    } else if (tipo == 3) {
      //clinica
      this.estabelecimentoService.get(options[0].data._id).subscribe(
        data => {
          const urlFomatada = data.nomeFormated.trim().split(' ').join('-').toLowerCase();
          if(!urlFomatada){
            this.toastr.warning('Não foi possível efetuar a busca', 'Atenção!');
            console.log("Erro ao efetuar a busca por clínica");
            return;
          }else{
            //@Regina
            //Globals['DOCTOR_URL'] = urlFomatada;
            this.router.navigate([`/clinic/${urlFomatada}`]);
          }
        },
        error => {
          console.log(error);
          this.toastr.warning('Não foi possível efetuar a busca', 'Atenção!');
          return;

        });
    }

  }

  formataUrl(data){
    if(data.nomeFormated && data.especialidades && data.endereco){
      return (data.nomeFormated.trim().split(' ').join('-')+"/"+data.especialidades[0].nomeFormated.trim().split(' ').join('-')+"/"+data.endereco.municipio.trim().split(' ').join('-')).toLowerCase();

    }
    return "";
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
    let places: any = this.places.filter(p => p.placeId ==  this.cidadeEscolhida)[0];

    setTimeout(() => {
      if (!filtro.type || filtro.type == 1) {
        this.router.navigate([`/list/${this.formataUrlEspec(filtro.nome, places.description)}`]);
        Globals['DESC_SEARCH_DOCTOR'] = filtro.nome+ "- "+ places.description;

      } else if (filtro.type == 2) {
        //Veterinario
        Globals['DOCTOR_URL'] = filtro.nome;
        console.log(filtro);
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
          this.totalListaEspecialidade = data;
          this.especialidadesTotal = data.slice(0, this.showTotalEspecialidade);
        },
        error => {
          console.log(error);
        });
  }

  showMoreEspecialidade(){
    this.especialidadesTotal = this.totalListaEspecialidade.slice(0, this.especialidadesTotal.length + this.showTotalEspecialidade);
  }

  showLessEspecialidade(){
    this.especialidadesTotal = this.totalListaEspecialidade.slice(0, this.showTotalEspecialidade);
  }

  getURLImgEspc(nome){
    return 'assets/img/shapes/'+nome+'.png';
  }



  formataUrlEspec(especialidade, municipio){
    if(especialidade && municipio){
      return (especialidade.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim().split(' ').join('-')+"/"+municipio.trim().split(' ').join('-')).toLowerCase();
    }

    return "";
  }

}
