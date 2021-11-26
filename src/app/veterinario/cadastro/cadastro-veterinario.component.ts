import { Estabelecimento } from './../../models/estabelecimento';
import { VeterinarioService } from './../../services/veterinario.service';
import { CEPService } from './../../services/cep.service';
import { EstabelecimentoService } from '../../services/estabelecimento.service';

import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';

import { EspecialidadeService } from 'src/app/services/especialidades.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Veterinario } from 'src/app/models/veterinario';

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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private especialidadeSevice: EspecialidadeService,
              private formBuilder: FormBuilder,
              private estabelecimentoSevice: EstabelecimentoService,
              private cepService: CEPService,
              private veterinarioService: VeterinarioService ) {

  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.veterinarioForm = this.formBuilder.group(
      {
        _id: [null],
        crmv: [null, [Validators.required, Validators.minLength(4)]],
        nome: [null, [Validators.required, Validators.minLength(4)]],
        status:[true, [Validators.required]],
        atendePlano: [null],
        especialidades: [null],
        endereco: this.createEnderecoFormGroup(),
        contato: this.createContatoFormGroup(),
        estabelecimentos: new FormBuilder().array([this.createEstabelecimento()])
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
    this.veterinarioService.get(this.id).subscribe(veterinario => {

      let vet = veterinario as Veterinario;

      this.veterinarioForm.patchValue(vet);

      if(veterinario.img){
        this.url = veterinario.img;
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
        this.veterinarioForm.get('estabelecimentos').patchValue(vet.estabelecimentos);
      }

    }),(error) => {
      console.log(error);
    }


  }

  salvar(){
    if (this.veterinarioForm.valid) {
      const novoVeterinario = this.veterinarioForm.getRawValue() as Veterinario;
      
      if(this.url){
        novoVeterinario.img = this.url;
      }

      if(this.id){
        this.veterinarioService.update(this.id, novoVeterinario).subscribe(
          () => {
            this.router.navigate(['/veterinario/lista/']);
          },
          (error) => {
            console.log(error);
          }
        );

      }else{
      this.veterinarioService.create(novoVeterinario).subscribe(
          () => {
            this.router.navigate(['/veterinario/lista/']);
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

}
