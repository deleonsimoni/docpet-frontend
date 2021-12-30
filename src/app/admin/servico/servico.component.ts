import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import { ServicoService } from 'src/app/services/servico.service';
import { ToastrService } from 'ngx-toastr';
import { Servico } from 'src/app/models/servico';


@Component({
  selector: 'app-invoice-reports',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {
  servicos: any = [];
  servico: any;
  errorMessage: string;
  modalRef: BsModalRef;
  id;
  dtOptions: DataTables.Settings = {};
  nome;
  img;

  constructor(
    public commonService: CommonServiceService,
    private modalService: BsModalService,
    private toastService: ToastrService,
    private servicoService: ServicoService) { }

  ngOnInit(): void {
    this.getServicos();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  getServicos() {
    this.nome = ""
        this.id = "";
        this.img = "";
    this.servicoService.getAll()
      .subscribe(res => {
        this.servicos = res;
      },
        error => this.toastService.error('Ocorreu um erro ao listar ' + error, 'Atenção'));
  }

  getServico(id){
    this.servicoService.get(id)
      .subscribe(res => {
        this.nome = res.nome;
        this.id = res._id;
        this.img = res.img;
      },
        error => this.toastService.error('Ocorreu um erro ao consultar por id ' + error, 'Atenção'));
  }

  deleteModal(template: TemplateRef<any>, trans) {
    this.id = trans._id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
  }

  deleteServico() {
    this.servicoService.delete(this.id)
      .subscribe(res => {
        this.toastService.success('Servico excluído com sucesso', 'Sucesso');

        this.getServicos();

      },
        error => {
          if (error.status == 400) {
            this.toastService.warning('Essa Servico já está vinculada aos estabelecimentos', 'Atenção');

          } else {
            this.toastService.error('Ocorreu um erro ao excluir ' + error, 'Atenção');
          }
        }
      );
    this.modalRef.hide();

  }

  create() {

    if (!this.nome) {
      this.toastService.warning('Digite o nome do Serviço', 'Atenção')
      return
    }

    const data = {
      nome: this.nome,
      img: this.img ? this.img : ''
    }

    if(!this.id){
      this.servicoService.create(data)
      .subscribe(res => {
        this.toastService.success('Servico cadastrado com sucesso', 'Sucesso');
        this.nome = "";
        this.getServicos();
      },
        error => {

          this.toastService.error('Ocorreu um erro ao excluir ' + error, 'Atenção');

        }
      );

    }else{
      this.servicoService.update(this.id, data)
      .subscribe(res => {
        this.toastService.success('Servico atualizado com sucesso', 'Sucesso');
        this.nome = "";
        this.getServicos();
      },
        error => {
          this.toastService.error('Ocorreu um erro ao atualizar ' + error, 'Atenção');
        }
      );
    }


  }

  deleteImg(){
    this.img = null;
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.img = event.target.result;
      }
    }
  }

  btnColor() {
    document.getElementById('btn-yes').style.backgroundColor = "#00d0f1";
    document.getElementById('btn-yes').style.border = "1px solid #00d0f1";
    document.getElementById('btn-yes').style.color = "#fff";

    document.getElementById('btn-no').style.backgroundColor = "#fff";
    document.getElementById('btn-no').style.border = "1px solid #fff";
    document.getElementById('btn-no').style.color = "#000";
  }

  btnColorNo() {
    document.getElementById('btn-no').style.backgroundColor = "#00d0f1";
    document.getElementById('btn-no').style.border = "1px solid #00d0f1";
    document.getElementById('btn-no').style.color = "#fff";

    document.getElementById('btn-yes').style.backgroundColor = "#fff";
    document.getElementById('btn-yes').style.border = "1px solid #fff";
    document.getElementById('btn-yes').style.color = "#000";
  }

}
