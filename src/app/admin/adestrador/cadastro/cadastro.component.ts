import { UserService } from './../../../services/user.service';
import { Estabelecimento } from './../../../models/estabelecimento';
import { CEPService } from './../../../services/cep.service';
import { EstabelecimentoService } from '../../../services/estabelecimento.service';

import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';

import { EspecialidadeService } from 'src/app/services/especialidades.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AdestradorService } from 'src/app/services/adestrador.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  splitVal;
  url;
  base = 'Adestrador';
  page = 'Cadastro';
  listaEspecialidade: any;
  adestrador:any;
  isEstabelecimento: Boolean;
  isAddMode!: boolean;
  id!: string;
  lat;
  lng;
  showMap = false;
  especialidade: any;
  adestradorForm: FormGroup;
  estabelecimentos: FormArray;
  formacoes: FormArray;
  experiencias: FormArray;
  conquistas: FormArray;
  userLogged;

  listaAnos = [];
  meses = [ {id:1, mes:'Janeiro', abreviado:'Jan'},
            {id:2, mes:'Fevereiro', abreviado:'Fev'},
            {id:3, mes:'Março', abreviado:'Mar'},
            {id:4, mes:'Abril', abreviado:'Abr'},
            {id:5, mes:'Maio', abreviado:'Mai'},
            {id:6, mes:'Junho', abreviado:'Jun'},
            {id:7, mes:'Julho', abreviado:'Jul'},
            {id:8, mes:'Agosto', abreviado:'Ago'},
            {id:9, mes:'Setembro', abreviado:'Set'},
            {id:10, mes:'Outubro', abreviado:'Out'},
            {id:11, mes:'Novembro', abreviado:'Nov'},
            {id:12, mes:'Dezembro', abreviado:'Dez'},
          ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private especialidadeSevice: EspecialidadeService,
              private formBuilder: FormBuilder,
              private estabelecimentoSevice: EstabelecimentoService,
              private cepService: CEPService,
              private adestradorService: AdestradorService,
              private userService: UserService, ) {

  }

  ngOnInit(): void {
    this.userLogged = this.userService.getUser();
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    var ano = new Date().getFullYear();
    var anos=[];
    anos.push(ano);
    for (var i = 1; i < 40; i++) {
      anos.push(ano - i);
    }


    this.listaAnos = anos;

    this.adestradorForm = this.formBuilder.group(
      {
        _id: [null],
        rg: [null, [Validators.required, Validators.minLength(4)]],
        nome: [null, [Validators.required, Validators.minLength(4)]],
        status:[null],
        atendePlano: [null],
        especialidades: [null],
        uf:[null, [Validators.required, Validators.minLength(2)]],
        endereco: this.createEnderecoFormGroup(),
        contato: this.createContatoFormGroup(),
        estabelecimentos: new FormBuilder().array([this.createEstabelecimento()]),
        sobre: [null],
        formacoes: new FormBuilder().array([this.createFormacao()]),
        experiencias: new FormBuilder().array([this.createExperiencias()]),
        conquistas: new FormBuilder().array([]),

      }
    );

    this.listarEspecialidades();

    if(!this.isAddMode && this.id){
      this.popular();
    }

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
      }
    });
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  public delete(){
    this.url = null;
  }

  popular(){
    this.adestradorService.get(this.id).subscribe(res => {

      let vet = res;


      if(res.img){
        this.url = res.img;
      }

      if(vet.location){
        var location = vet.location;
        this.lat = location.coordinates[1];
        this.lng = location.coordinates[0];
        this.showMap = true;
      }

      if(vet.estabelecimentos.length > 0){
        this.isEstabelecimento = true;

        this.estabelecimentos = this.adestradorForm.get('estabelecimentos') as FormArray;

        for(var i=1; i < vet.estabelecimentos.length; i++){
          this.addEstabelecimento();
        }
      }

      if(vet.formacoes && vet.formacoes.length > 0){

        this.formacoes = this.adestradorForm.get('formacoes') as FormArray;

        for(var i=1; i < vet.formacoes.length; i++){
          this.addFormacao();
        }

      }

      if(vet.experiencias && vet.experiencias.length > 0){

        this.experiencias = this.adestradorForm.get('experiencias') as FormArray;

        for(var i=1; i < vet.experiencias.length; i++){
          this.addExperiencia();
        }

      }

      if(vet.conquistas && vet.conquistas.length > 0){

        this.conquistas = this.adestradorForm.get('conquistas') as FormArray;

        for(var i=1; i < vet.conquistas.length; i++){
          this.addConquista();
        }
      }

      setTimeout( () => {      
        this.adestradorForm.patchValue(vet);
      }, 200 );

    }),(error) => {
      console.log(error);
    }


  }

  salvar(){
    if (this.adestradorForm.valid) {
      const novoAdestrador = this.adestradorForm.getRawValue();

      if(this.url){
        novoAdestrador.img = this.url;
      }

      if(this.id){
        this.adestradorService.update(this.id, novoAdestrador).subscribe(
          () => {
            if(this.userLogged.isAdmin){
              this.router.navigate(['/admin/list-adestrador']);
            }else{
              this.router.navigate(['/admin/dashboard-adestrador']);
            }
          },
          (error) => {
            console.log(error);
          }
        );

      }else{
      this.adestradorService.create(novoAdestrador).subscribe(
          () => {
            this.router.navigate(['/admin/list-adestrador']);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

   listarEspecialidades(): void {
    this.especialidadeSevice.getAll()
      .subscribe(
        data => {
          this.listaEspecialidade = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  buscarMap():void{

    const novoAdestrador = this.adestradorForm.getRawValue();

    this.cepService.getLocale(JSON.stringify(novoAdestrador.endereco)).subscribe(data=>{
      this.lat = data.lat;
      this.lng = data.lng
      this.showMap = true;
    }, error=>{
      console.log(error);
    })

  }

  buscarCEP(cep:String):void{
    this.cepService.get(cep).subscribe(data=>{
      this.adestradorForm.get('endereco').patchValue({'bairro':data.bairro, 'logradouro': data.logradouro, 'municipio': data.localidade, 'estado' : data.uf});
    }, error=>{
      console.log(error);
    })
  }

  findEstab(i:number){
    this.estabelecimentos = this.adestradorForm.get('estabelecimentos') as FormArray;
    var estab = this.estabelecimentos['controls'][i].value;
    this.estabelecimentos['controls'][i].get('nome').enable();
    this.estabelecimentos['controls'][i].patchValue({'_id':'', 'nome':''});

    this.estabelecimentoSevice.getByCNPJ(estab.cnpj).subscribe(data=>{
      console.log(data);
      if(data){
        console.log(this.estabelecimentos['controls'][i]);
        this.estabelecimentos['controls'][i].patchValue(data);
        this.estabelecimentos['controls'][i].get('nome').disable();
      }

    },
     error=>{
      console.log(error);
    })
  }

  createContatoFormGroup(): FormGroup{
    return this.formBuilder.group({
      nome:[null, [Validators.required, Validators.minLength(4)]],
      email:[null, [Validators.required, Validators.email]],
      telefone:[''],
      celular:[null, [Validators.required]]
    });
  }

  createEnderecoFormGroup(): FormGroup{
    return this.formBuilder.group({
      cep:[null, [Validators.required, Validators.minLength(4)]],
      logradouro:[null, Validators.required],
      numero:[null, Validators.required],
      complemento:[null],
      bairro:[null, Validators.required],
      municipio:[null, Validators.required],
      estado:[null, Validators.required]
    });
  }

  createEstabelecimento(): FormGroup {
    return this.formBuilder.group({
      _id: '',
      nome: '',
      cnpj: '',
    });
  }

  addEstabelecimento(): void {
    this.estabelecimentos = this.adestradorForm.get('estabelecimentos') as FormArray;
    this.estabelecimentos.push(this.createEstabelecimento());
  }

  removeEstabelecimento(i:number) {
    this.estabelecimentos.removeAt(i);
  }

  createFormacao(): FormGroup {
    return this.formBuilder.group({
      nomeInstituicao:[null, [Validators.required, Validators.minLength(4)]],
      curso:[null, Validators.required],
      anoInicio:[null, Validators.required],
      anoFim:[null],
    });
  }

  addFormacao(): void {
    this.formacoes = this.adestradorForm.get('formacoes') as FormArray;
    this.formacoes.push(this.createFormacao());
  }

  removeFormacao(i:number) {
    this.formacoes.removeAt(i);
  }

  createExperiencias(): FormGroup {
    return this.formBuilder.group({
      nomeEstabelecimento:[null, [Validators.required, Validators.minLength(4)]],
      anoInicio:[null, Validators.required],
      anoFim:[null],
    });
  }

  addExperiencia(): void {
    this.experiencias = this.adestradorForm.get('experiencias') as FormArray;
    this.experiencias.push(this.createExperiencias());
  }

  removeExperiencia(i:number) {
    this.experiencias.removeAt(i);
  }

  createConquistas(): FormGroup {
    return this.formBuilder.group({
      nome:[null, [Validators.required, Validators.minLength(4)]],
      mes:[null, Validators.required],
      ano:[null],
      descricao:[null, Validators.required],
    });
  }

  addConquista(): void {
    this.conquistas = this.adestradorForm.get('conquistas') as FormArray;
    this.conquistas.push(this.createConquistas());
  }

  removeConquista(i:number) {
    this.conquistas.removeAt(i);
  }


}
