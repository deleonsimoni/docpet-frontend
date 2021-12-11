import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Veterinario } from '../models/veterinario';
import { CEPService } from '../services/cep.service';
import { EspecialidadeService } from '../services/especialidades.service';
import { EstabelecimentoService } from '../services/estabelecimento.service';
import { UserService } from '../services/user.service';
import { VeterinarioService } from '../services/veterinario.service';

@Component({
  selector: 'app-form-contato',
  templateUrl: './form-contato.component.html',
  styleUrls: ['./form-contato.component.css']
})
export class FormContatoComponent implements OnInit {

  base = '';
  page = 'Cadastre-se';
  form: FormGroup;
  role = 0;
  url;
  listaEspecialidade: any;
  isEstabelecimento: Boolean;
  lat;
  lng;
  showMap = false;
  especialidade: any;
  estabelecimentos: FormArray;
  formacoes: FormArray;
  experiencias: FormArray;
  conquistas: FormArray;
  isAddMode!: boolean;
  isVeterinario: Boolean;
  veterinarios: FormArray;
  isLoading = false;

  listaAnos = [];
  meses = [{ id: 1, mes: 'Janeiro', abreviado: 'Jan' },
  { id: 2, mes: 'Fevereiro', abreviado: 'Fev' },
  { id: 3, mes: 'Março', abreviado: 'Mar' },
  { id: 4, mes: 'Abril', abreviado: 'Abr' },
  { id: 5, mes: 'Maio', abreviado: 'Mai' },
  { id: 6, mes: 'Junho', abreviado: 'Jun' },
  { id: 7, mes: 'Julho', abreviado: 'Jul' },
  { id: 8, mes: 'Agosto', abreviado: 'Ago' },
  { id: 9, mes: 'Setembro', abreviado: 'Set' },
  { id: 10, mes: 'Outubro', abreviado: 'Out' },
  { id: 11, mes: 'Novembro', abreviado: 'Nov' },
  { id: 12, mes: 'Dezembro', abreviado: 'Dez' },
  ];

  constructor(
    private router: Router,
    private especialidadeSevice: EspecialidadeService,
    private formBuilder: FormBuilder,
    private estabelecimentoSevice: EstabelecimentoService,
    private cepService: CEPService,
    private veterinarioService: VeterinarioService,
    private toastr: ToastrService,
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    var ano = new Date().getFullYear();
    var anos=[];
    anos.push(ano);
    for (var i = 1; i < 40; i++) {
      anos.push(ano - i);
    }
    this.listaAnos = anos;
    this.listarEspecialidades();
    this.createForm();
  }

  findVet(i: number) {
    this.veterinarios = this.form.get('veterinarios') as FormArray;
    var vet = this.veterinarios['controls'][i].value;
    this.veterinarios['controls'][i].get('nome').enable();
    this.veterinarios['controls'][i].patchValue({ '_id': '', 'nome': '' });
    console.log(this.veterinarios['controls'][i]);

    this.veterinarioService.getByCRMV(vet.crmv).subscribe(data => {
      if (data) {
        console.log(this.veterinarios['controls'][i]);
        this.veterinarios['controls'][i].patchValue(data);
        this.veterinarios['controls'][i].get('nome').disable();
      }

    },
      error => {
        console.log(error);
      })
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

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  public delete() {
    this.url = null;
  }


  createForm() {

    this.form = this.formBuilder.group(
      {

        nome: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmpassword: ['', [Validators.required]],


        crmv: [null, [Validators.minLength(4)]],
        status: [true, []],
        atendePlano: [null],
        especialidades: [null],
        endereco: this.createEnderecoFormGroup(),
        contato: this.createContatoFormGroup(),
        estabelecimentos: new FormBuilder().array([this.createEstabelecimento()]),
        sobre: [null],
        formacoes: new FormBuilder().array([this.createFormacao()]),
        experiencias: new FormBuilder().array([this.createExperiencias()]),
        conquistas: new FormBuilder().array([this.createConquistas()]),
        veterinarios: new FormBuilder().array([this.createVeterinario()]),
        cnpj: [null, [Validators.minLength(11)]],
      }
    );

  }

  salvar() {

    if (this.role == 1) {
      //veterinario
      if (!this.form.get('crmv').value) {
        this.toastr.warning('Preencha o campo CRMV!', 'Atenção!');
        return;
      }
      if (!this.form.get('formacoes').value[0].nomeInstituicao
        || !this.form.get('formacoes').value[0].curso
        || !this.form.get('formacoes').value[0].anoInicio
        || !this.form.get('formacoes').value[0].anoFim) {
        this.toastr.warning('Preencha o campo Formação!', 'Atenção!');
        return;
      }

      if (!this.form.get('experiencias').value[0].nomeEstabelecimento
        || !this.form.get('experiencias').value[0].anoInicio
        || !this.form.get('experiencias').value[0].anoFim) {
        this.toastr.warning('Preencha o campo experiencias!', 'Atenção!');
        return;
      }

      if (!this.form.get('conquistas').value[0].nome
        || !this.form.get('conquistas').value[0].mes
        || !this.form.get('conquistas').value[0].ano) {
        this.toastr.warning('Preencha o campo conquistas!', 'Atenção!');
        return;
      }

      if (!this.form.get('contato').value.celular) {
        this.toastr.warning('Preencha o campo Celular!', 'Atenção!');
        return;
      }

      if (!this.form.get('endereco').value.cep
      || !this.form.get('endereco').value.numero) {
      this.toastr.warning('Preencha o campo endereco!', 'Atenção!');
      return;
    }

    } else if (this.role == 2) {
      //clinica
      if (!this.form.get('cnpj').value) {
        this.toastr.warning('Preencha o campo CNPJ!', 'Atenção!');
        return;
      }

    }

    if (!this.form.get('nome').value) {
      this.toastr.warning('Preencha o campo Nome!', 'Atenção!');
      return;
    }
    if (!this.form.get('email').value) {
      this.toastr.warning('Preencha o campo Email!', 'Atenção!');
      return;
    }
    if (!this.form.get('password').value) {
      this.toastr.warning('Preencha o campo Senha!', 'Atenção!');
      return;
    }
    if (!this.form.get('confirmpassword').value) {
      this.toastr.warning('Preencha o campo Conformação de senha!', 'Atenção!');
      return;
    }
    if (this.form.get('confirmpassword').value != this.form.get('password').value) {
      this.toastr.warning('Senha e confirmação de senha não conferem!', 'Atenção!');
      return;
    }

    this.isLoading = true;
    let req = this.form.value;
    req.role = this.role;
    req.img = this.url;

    this.userService.create(req).subscribe(
      (data) => {
        this.isLoading = false;
        this.userService.setSession(data.token);
        this.router.navigate(['/']);
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
        if (error.status == 400) {
          this.toastr.error(error.error.error, 'Erro');

        }
      }
    );




  }

  buscarMap(): void {

    const novoVeterinario = this.form.getRawValue() as Veterinario;

    this.cepService.getLocale(JSON.stringify(novoVeterinario.endereco)).subscribe(data => {
      this.lat = data.lat;
      this.lng = data.lng
      this.showMap = true;
    }, error => {
      console.log(error);
    })

  }

  buscarCEP(cep: String): void {
    this.cepService.get(cep).subscribe(data => {
      this.form.get('endereco').patchValue({ 'bairro': data.bairro, 'logradouro': data.logradouro, 'municipio': data.localidade, 'estado': data.uf });
    }, error => {
      console.log(error);
    })
  }

  findEstab(i: number) {
    this.estabelecimentos = this.form.get('estabelecimentos') as FormArray;
    var estab = this.estabelecimentos['controls'][i].value;
    this.estabelecimentos['controls'][i].get('nome').enable();
    this.estabelecimentos['controls'][i].patchValue({ '_id': '', 'nome': '' });

    this.estabelecimentoSevice.getByCNPJ(estab.cnpj).subscribe(data => {
      console.log(data);
      if (data) {
        console.log(this.estabelecimentos['controls'][i]);
        this.estabelecimentos['controls'][i].patchValue(data);
        this.estabelecimentos['controls'][i].get('nome').disable();
      }

    },
      error => {
        console.log(error);
      })
  }

  createContatoFormGroup(): FormGroup {
    return this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      telefone: [''],
      celular: ['']
    });
  }

  createEnderecoFormGroup(): FormGroup {
    return this.formBuilder.group({
      cep: [null, [Validators.required, Validators.minLength(4)]],
      logradouro: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [null],
      bairro: [null, Validators.required],
      municipio: [null, Validators.required],
      estado: [null, Validators.required]
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
    this.estabelecimentos = this.form.get('estabelecimentos') as FormArray;
    this.estabelecimentos.push(this.createEstabelecimento());
  }

  removeEstabelecimento(i: number) {
    this.estabelecimentos.removeAt(i);
  }

  createFormacao(): FormGroup {
    return this.formBuilder.group({
      nomeInstituicao: [null, [Validators.required, Validators.minLength(4)]],
      curso: [null, Validators.required],
      anoInicio: [null, Validators.required],
      anoFim: [null, Validators.required],
    });
  }

  addFormacao(): void {
    this.formacoes = this.form.get('formacoes') as FormArray;
    this.formacoes.push(this.createFormacao());
  }

  removeFormacao(i: number) {
    this.formacoes.removeAt(i);
  }

  createExperiencias(): FormGroup {
    return this.formBuilder.group({
      nomeEstabelecimento: [null, [Validators.required, Validators.minLength(4)]],
      anoInicio: [null, Validators.required],
      anoFim: [null],
    });
  }

  addExperiencia(): void {
    this.experiencias = this.form.get('experiencias') as FormArray;
    this.experiencias.push(this.createExperiencias());
  }

  removeExperiencia(i: number) {
    this.experiencias.removeAt(i);
  }

  createConquistas(): FormGroup {
    return this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(4)]],
      mes: [null, Validators.required],
      ano: [null, Validators.required],
      descricao: [null, Validators.required],
    });
  }

  addConquista(): void {
    this.conquistas = this.form.get('conquistas') as FormArray;
    this.conquistas.push(this.createConquistas());
  }

  removeConquista(i: number) {
    this.conquistas.removeAt(i);
  }

  createVeterinario(): FormGroup {
    return this.formBuilder.group({
      _id: '',
      nome: '',
      crmv: '',
    });
  }

  addVeterinario(): void {
    this.veterinarios = this.form.get('veterinarios') as FormArray;
    this.veterinarios.push(this.createVeterinario());
  }

  removeVeterinario(i: number) {
    this.veterinarios.removeAt(i);
  }
}
