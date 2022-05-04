import { UserService } from './../../../services/user.service';
import { Estabelecimento } from './../../../models/estabelecimento';
import { VeterinarioService } from './../../../services/veterinario.service';
import { CEPService } from './../../../services/cep.service';
import { EstabelecimentoService } from '../../../services/estabelecimento.service';

import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';

import { EspecialidadeService } from 'src/app/services/especialidades.service';
import{UploadImagemService} from 'src/app/services/upload-imagen.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Veterinario } from 'src/app/models/veterinario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-veterinario',
  templateUrl: './cadastro-veterinario.component.html',
  styleUrls: ['./cadastro-veterinario.component.css']
})

export class CadastroVeterinarioComponent implements OnInit {
  splitVal;
  url;
  base = 'Veterinário';
  page = 'Cadastro';
  listaEspecialidade: any;
  veterinario:Veterinario;
  isEstabelecimento: Boolean;
  isAddMode!: boolean;
  id!: string;
  lat;
  lng;
  showMap = false;
  especialidade: any;
  veterinarioForm: FormGroup;
  estabelecimentos: FormArray;
  formacoes: FormArray;
  experiencias: FormArray;
  conquistas: FormArray;
  userLogged;
  hideFooter: boolean = true;
  listaAnos = [];
  formDataImg = null;

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
              private veterinarioService: VeterinarioService,
              private userService: UserService,
              private uploadImagemService:  UploadImagemService,
              private toastr: ToastrService,) {

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

    this.veterinarioForm = this.formBuilder.group(
      {
        _id: [null],
        crmv: [null, [Validators.required, Validators.minLength(4)]],
        nome: [null, [Validators.required, Validators.minLength(4)]],
        status:[null],
        atendePlano: [null],
        especialidades: [null],
        uf:[null, [Validators.required, Validators.minLength(2)]],
        endereco: this.createEnderecoFormGroup(),
        contato: this.createContatoFormGroup(),
        estabelecimentos: new FormBuilder().array([this.createEstabelecimento()]),
        sobre: [null],
        formacoes: new FormBuilder().array([]),
        experiencias: new FormBuilder().array([]),
        conquistas: new FormBuilder().array([]),
        avatar: [null]

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
      let maxSize = 2048;
      let size = Math.ceil(event.target.files[0].size / 1024);

      const allowedMimes = [
        'image/jpg',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/gif',
        'image/webp'
      ];

      if (!allowedMimes.includes(event.target.files[0].type)) {
        this.toastr.warning('Tipo da imagem não é aceito.', 'Atenção!');
        return false;
      }
      
      if(size > maxSize){
        this.toastr.warning('Tamanho da imagem é maior que 2MB', 'Atenção!');
        return false;
      }
      var reader = new FileReader();     

      this.formDataImg = new FormData();
      this.formDataImg.append('file', event.target.files[0]);

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
    this.veterinarioService.get(this.id).subscribe(veterinario => {

      let vet = veterinario as Veterinario;

      if(vet.avatar){
        this.url = vet.avatar.url;
      }

      if(vet.location){
        var location = vet.location;
        this.lat = location.coordinates[1];
        this.lng = location.coordinates[0];
        this.showMap = true;
      }

      if(vet.estabelecimentos.length > 0){
        this.isEstabelecimento = true;

        this.estabelecimentos = this.veterinarioForm.get('estabelecimentos') as FormArray;

        for(var i=1; i < vet.estabelecimentos.length; i++){
          this.addEstabelecimento();
        }
      }

      if(vet.formacoes && vet.formacoes.length > 0){

        this.formacoes = this.veterinarioForm.get('formacoes') as FormArray;

        for(var i=1; i < vet.formacoes.length; i++){
          this.addFormacao();
        }
      }

      if(vet.experiencias && vet.experiencias.length > 0){

        this.experiencias = this.veterinarioForm.get('experiencias') as FormArray;

        for(var i=1; i < vet.experiencias.length; i++){
          this.addExperiencia();
        }
      }

      if(vet.conquistas && vet.conquistas.length > 0){

        this.conquistas = this.veterinarioForm.get('conquistas') as FormArray;

        for(var i=1; i < vet.conquistas.length; i++){
          this.addConquista();
        }
      }

      setTimeout( () => {
        this.veterinarioForm.patchValue(vet);
      }, 200 );

    }),(error) => {
      console.log(error);
    }


  }

  async salvarImagem(){
    let avatar = null;
      if(this.formDataImg){
        
        await this.uploadImagemService.createAwait(this.formDataImg).then((data)=>{
          avatar = data;
        }).catch((error)=>{
          this.toastr.warning('Não foi possível enviar a imagem.', 'Atenção!');
          console.log("Promise rejected with " + JSON.stringify(error));
        });
    }
    return avatar;
  }

  async salvar(){
    if (this.veterinarioForm.valid) {
     
      const avatar = await this.salvarImagem();

      const novoVeterinario = this.veterinarioForm.getRawValue() as Veterinario;

      if(avatar){
        novoVeterinario.avatar = avatar;
      }

      if(this.id){
        this.veterinarioService.update(this.id, novoVeterinario).subscribe(
          () => {
            if(this.userLogged.isAdmin){
              this.router.navigate(['/admin/list-veterinario']);
            }else{
              this.router.navigate(['/admin/dashboard']);
            }
          },
          (error) => {
            this.toastr.warning('Não foi possível atualizar.', 'Atenção!');
            console.log(error);
          }
        );

      }else{
      this.veterinarioService.create(novoVeterinario).subscribe(
          () => {
            this.router.navigate(['/admin/list-veterinario']);
          },
          (error) => {
            this.toastr.warning('Não foi possível salvar as informações.', 'Atenção!');
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
        },
        error => {
          console.log(error);
        });
  }

  buscarMap():void{

    const novoVeterinario = this.veterinarioForm.getRawValue() as Veterinario;

    this.cepService.getLocale(JSON.stringify(novoVeterinario.endereco)).subscribe(data=>{
      this.lat = data.lat;
      this.lng = data.lng
      this.showMap = true;
    }, error=>{
      console.log(error);
    })

  }

  buscarCEP(cep:String):void{
    this.cepService.get(cep).subscribe(data=>{
      this.veterinarioForm.get('endereco').patchValue({'bairro':data.bairro, 'logradouro': data.logradouro, 'municipio': data.localidade, 'estado' : data.uf});
    }, error=>{
      console.log(error);
    })
  }

  findEstab(i:number){
    this.estabelecimentos = this.veterinarioForm.get('estabelecimentos') as FormArray;
    var estab = this.estabelecimentos['controls'][i].value;
    this.estabelecimentos['controls'][i].get('nome').enable();
    this.estabelecimentos['controls'][i].patchValue({'_id':'', 'nome':''});

    this.estabelecimentoSevice.getByCNPJ(estab.cnpj).subscribe(data=>{

      if(data){

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
      email:[null, [Validators.required, Validators.email]],
      telefone:[''],
      celular:[null]
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
    this.estabelecimentos = this.veterinarioForm.get('estabelecimentos') as FormArray;
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
    this.formacoes = this.veterinarioForm.get('formacoes') as FormArray;
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
    this.experiencias = this.veterinarioForm.get('experiencias') as FormArray;
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
    this.conquistas = this.veterinarioForm.get('conquistas') as FormArray;
    this.conquistas.push(this.createConquistas());
  }

  removeConquista(i:number) {
    this.conquistas.removeAt(i);
  }

  validaTelefone (){
    if(!this.veterinarioForm.get('contato')?.get('celular').value && !this.veterinarioForm.get('contato')?.get('telefone').value){
      return true;
    }
    return false;
  }
}
