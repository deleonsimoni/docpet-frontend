import { UserService } from '../../../services/user.service';
import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Plano } from 'src/app/models/plano';
import { PlanoService } from 'src/app/services/plano.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cadastro-veterinario',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {
  splitVal;
  url;
  base = 'Plano';
  page = 'Cadastro';
  
  caracteristicas: FormArray;
  isAddMode!: boolean;
  userLogged;
  id!: string;
  
  planoForm: FormGroup;
  

  hideFooter: boolean = true;
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder, private planoService: PlanoService,
              private toastService: ToastrService, 
              private userService: UserService ) {

  }

  ngOnInit(): void {
    this.userLogged = this.userService.getUser();
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;


    this.planoForm = this.formBuilder.group(
      {
        _id: [null],
        nome: [null, [Validators.required, Validators.minLength(5)]],
        descricao:[null,[Validators.required]],
        diasVencimento:[null,[Validators.required]],
        cobranca: this.createCobrancaFormGroup(),
        caracteristicas: new FormBuilder().array([]),
      }
  )

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

  createCobrancaFormGroup(): FormGroup{
    return this.formBuilder.group({
      valor:[null, [Validators.required]],
      parcela:[null],
      quantidadeParcela:[null, [Validators.required]],
      cupom:[null],
    });
  }

  createCaracteristica(): FormGroup {
    return this.formBuilder.group({
      titulo:[null, [Validators.required, Validators.minLength(4)]],
      descricao:[null],
    });
  }

  addCaracteristica(): void {
    this.caracteristicas = this.planoForm.get('caracteristicas') as FormArray;
    this.caracteristicas.push(this.createCaracteristica());
  }

  removeCaracteristica(i:number) {
    this.caracteristicas.removeAt(i);
  }

  popular(){
   this.planoService.get(this.id).subscribe(plano => {

      let planoCarregado = plano as Plano;

      if(planoCarregado.caracteristicas.length > 0){

        this.caracteristicas = this.planoForm.get('caracteristicas') as FormArray;

        for(var i=0; i < planoCarregado.caracteristicas.length; i++){
          this.addCaracteristica();
        }
      }

      
      setTimeout( () => {
        this.planoForm.patchValue(planoCarregado);
      }, 200 );
  
    },
    error => 
      this.toastService.error('Ocorreu um erro ao buscar o plano: ' + error, 'Atenção')
    )}

  salvar(){
    if (this.planoForm.valid) {
      const novoPlano = this.planoForm.getRawValue() as Plano;

      if(this.id){
        this.planoService.update(this.id, novoPlano).subscribe(
          () => {
            if(this.userLogged.isAdmin){
              this.toastService.success('Plano alterar com sucesso', 'Sucesso');
              this.router.navigate(['/admin/list-plano']);
            }
          },
          (error) => {
            this.toastService.error('Ocorreu um erro ao atualizar o plano: ' + error, 'Atenção')
          }
        );

      }else{
      this.planoService.create(novoPlano).subscribe(
          () => {
            this.toastService.success('Plano cadastrado com sucesso', 'Sucesso');
            this.router.navigate(['/admin/list-plano']);
          },
          (error) => {
            this.toastService.error('Ocorreu um erro ao cadastrar o plano: ' + error, 'Atenção')
          }
        );
      }
    }
  }

  ngAfterViewInit() {
    this.loadDynmicallyScript('assets/admin/js/script-focus-label.js');
  }

  loadDynmicallyScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() {}
 
}
