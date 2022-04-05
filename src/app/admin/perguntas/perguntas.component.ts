import { Component, OnInit } from '@angular/core';
import { INgxSelectOption } from 'ngx-select-ex';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EspecialidadeService } from 'src/app/services/especialidades.service';
import { PerguntasService } from 'src/app/services/perguntas.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrls: ['./perguntas.component.css']
})
export class PerguntasComponent implements OnInit {

  pergunta;
  buscando = false;
  perguntas;
  perguntaSelecionada;
  public especialidades: any[];
  user;
  especialidadeEscolhida;
  request: any = {};

  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private perguntasService: PerguntasService,
    private especialidadeSevice: EspecialidadeService,
    private userService: UserService,


  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (this.user.isAdmin) {
      this.getPerguntasAdmin();
      this.listarEspecialidades();
    } else {
      this.getPerguntas();
    }

  }



  public validarPergunta(pergunta, status): void {

    this.spinner.show();
    this.perguntasService.validarPergunta(pergunta._id, status).subscribe(
      (res) => {
        this.toastrService.success('Status alterado', 'Sucesso');
        pergunta.status = status;
        this.spinner.hide();
      },
      (error) => {
        this.toastrService.error('Erro ao listar perguntaSelecionada', 'Erro');
        this.spinner.hide();
      }
    );

  }


  public getDetalhesPergunta(pergunta): void {

    this.spinner.show();
    this.perguntasService.getDetailPergunta(pergunta._id).subscribe(
      (res) => {
        this.perguntaSelecionada = res[0];
        this.spinner.hide();
      },
      (error) => {
        this.toastrService.error('Erro ao listar perguntaSelecionada', 'Erro');
        this.spinner.hide();
      }
    );

  }

  public selectPergunta(pergunta): void {
    if (this.perguntaSelecionada?._id == pergunta._id) {
      this.perguntaSelecionada = {};
      this.request = {};
      return;
    } else {
      this.getDetalhesPergunta(pergunta);
    }
  }

  public responder(pergunta): void {

    if (!this.request.resposta) {
      this.toastrService.warning('Preencha o campo de resposta', 'Atenção');
      return;
    }
    this.spinner.show();
    this.perguntasService.responderPergunta(pergunta._id, this.request.resposta).subscribe(
      (res) => {
        this.request = {};
        this.getDetalhesPergunta(pergunta);
        this.toastrService.success('Resposta enviada com sucesso', 'Sucesso');
        this.spinner.hide();
      },
      (error) => {
        this.toastrService.error('Erro ao listar perguntaSelecionada', 'Erro');
        this.spinner.hide();
      }
    );

  }

  getPerguntasAdmin() {
    this.spinner.show();
    this.perguntasService.getAllAdmin().subscribe(
      (res) => {
        this.perguntas = res;
        this.spinner.hide();
      },
      (error) => {
        this.toastrService.error('Erro ao listar Perguntas', 'Erro');
        this.spinner.hide();
      }
    );
  }

  getPerguntas() {
    this.spinner.show();
    this.perguntasService.getPerguntasParaResponder().subscribe(
      (res) => {
        this.perguntas = res;
        this.spinner.hide();
      },
      (error) => {
        this.toastrService.error('Erro ao listar Perguntas', 'Erro');
        this.spinner.hide();
      }
    );
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

  changeEspecialidade(pergunta, options: INgxSelectOption[]) {

    this.spinner.show();
    this.perguntasService.changeEspecialidade(pergunta._id, options).subscribe(
      (res) => {
        this.toastrService.success('Especialidade alterada', 'Sucesso');
        this.spinner.hide();
      },
      (error) => {
        this.toastrService.error('Erro ao alterar especialidade', 'Erro');
        this.spinner.hide();
      }
    );


  }

}
