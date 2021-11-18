import { VeterinarioService } from './../../services/veterinario.service';
import { CEPService } from './../../services/cep.service';
import { EstabelecimentoService } from '../../services/estabelecimento.service';
import { Estabelecimento } from '../../models/estabelecimento';
import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';

import { EspecialidadeService } from 'src/app/services/especialidades.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {
  splitVal;
  url;
  base = 'Estabelecimento';
  page = 'Cadastro';
  listaEspecialidade: any;
  estabelecimento:Estabelecimento;
  isVeterinario: Boolean;
  isAddMode!: boolean;
  id!: string;

  lat;
  lng;
  showMap = false;

  especialidade: any;
  estabelecimentoForm: FormGroup;
  veterinarios: FormArray;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private especialidadeSevice: EspecialidadeService,
              private formBuilder: FormBuilder,
              private estabelecimentosevice: EstabelecimentoService,
              private cepService: CEPService,
              private veterinarioService: VeterinarioService ) {

  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    console.log(this.id);
    console.log(this.isAddMode);

    this.estabelecimentoForm = this.formBuilder.group(
      {
        _id: [null],
        cnpj: [null, [Validators.required, Validators.minLength(11)]],
        nome: [null, [Validators.required, Validators.minLength(4)]],
        status:[true, [Validators.required]],
        atendePlano: [null],
        especialidades: [null],
        endereco: this.createEnderecoFormGroup(),
        contato: this.createContatoFormGroup(),
        veterinarios: new FormBuilder().array([this.createVeterinario()])
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

    /*$('#isVeterinario_select input[name="checkIsVeterinario"]').on('click', function () {
      console.log($(this).val());
      if ($(this).prop( "checked" ) ) {
        $('#customIsPlanoSaude').show();
        $('#customInfoVeterinario').show();
      }else{
        $('#customIsPlanoSaude').hide();
        $('#customInfoVeterinario').hide();
      }
    }); */


  }

  popular(){
    console.log("Listando Estabelecimento por ID" + this.id);
    this.estabelecimentosevice.get(this.id).subscribe(estabelecimento => {
      let estab = estabelecimento as Estabelecimento;

      this.estabelecimentoForm.patchValue(estab);

      if(estab.veterinarios.length > 0){
        this.isVeterinario = true;

        for(var i=1; i < estab.veterinarios.length; i++){
          this.addVeterinario();
        }
        this.estabelecimentoForm.get('veterinarios').patchValue(estab.veterinarios);
      }
    }),(error) => {

      console.log(error);
    }
  }

  salvar(){
    if (this.estabelecimentoForm.valid) {
      const novoEstabelecimento = this.estabelecimentoForm.getRawValue() as Estabelecimento;

      if(this.id){
        this.estabelecimentosevice.update(this.id, novoEstabelecimento).subscribe(
          () => {
            this.router.navigate(['/estabelecimento/lista/']);
          },
          (error) => {
            console.log(error);
          }
        );

      }else{
      this.estabelecimentosevice.create(novoEstabelecimento).subscribe(
          () => {
            this.router.navigate(['/estabelecimento/lista/']);
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

    const novoEstabelecimento = this.estabelecimentoForm.getRawValue() as Estabelecimento;

    this.cepService.getLocale(JSON.stringify(novoEstabelecimento.endereco)).subscribe(data=>{
      this.lat = data.lat;
      this.lng = data.lng
      this.showMap = true;
    }, error=>{
      console.log(error);
    })

  }

  buscarCEP(cep:String):void{
    console.log(cep);
    this.cepService.get(cep).subscribe(data=>{
      console.log(data);
      this.estabelecimentoForm.get('endereco').patchValue({'bairro':data.bairro, 'logradouro': data.logradouro, 'municipio': data.localidade, 'estado' : data.uf});
    }, error=>{
      console.log(error);
    })
  }

  findVet(i:number){
    this.veterinarios = this.estabelecimentoForm.get('veterinarios') as FormArray;
    var vet = this.veterinarios['controls'][i].value;
    this.veterinarios['controls'][i].get('nome').enable();
    this.veterinarios['controls'][i].patchValue({'_id':'', 'nome':''});
    console.log(this.veterinarios['controls'][i]);

    this.veterinarioService.getByCRMV(vet.crmv).subscribe(data=>{
      if(data){
        console.log(this.veterinarios['controls'][i]);
        this.veterinarios['controls'][i].patchValue(data);
        this.veterinarios['controls'][i].get('nome').disable();
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
      celular:['']
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

  createVeterinario(): FormGroup {
    return this.formBuilder.group({
      _id: '',
      nome: '',
      crmv: '',
    });
  }

  addVeterinario(): void {
    this.veterinarios = this.estabelecimentoForm.get('veterinarios') as FormArray;
    this.veterinarios.push(this.createVeterinario());
  }

  removeVeterinario(i:number) {
    this.veterinarios.removeAt(i);
  }

}
