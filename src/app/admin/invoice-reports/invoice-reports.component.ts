import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import { EspecialidadeService } from 'src/app/services/especialidades.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-invoice-reports',
  templateUrl: './invoice-reports.component.html',
  styleUrls: ['./invoice-reports.component.css']
})
export class InvoiceReportsComponent implements OnInit {
  especialidades: any = [];
  errorMessage: string;
  modalRef: BsModalRef;
  id;
  dtOptions: DataTables.Settings = {};
  nome;

  constructor(
    public commonService: CommonServiceService,
    private modalService: BsModalService,
    private toastService: ToastrService,
    private especialidadeService: EspecialidadeService) { }

  ngOnInit(): void {
    this.getEspecialidades();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  getEspecialidades() {
    this.especialidadeService.getAll()
      .subscribe(res => {
        this.especialidades = res;

      },
        error => this.toastService.error('Ocorreu um erro ao listar ' + error, 'Atenção'));
  }

  deleteModal(template: TemplateRef<any>, trans) {
    this.id = trans._id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
  }

  deleteEspecialidade() {
    this.especialidadeService.delete(this.id)
      .subscribe(res => {
        this.toastService.success('Especialidade excluída com sucesso', 'Sucesso');

        this.getEspecialidades();

      },
        error => {
          if (error.status == 400) {
            this.toastService.warning('Essa especialidade já está vinculada aos usuários', 'Atenção');

          } else {
            this.toastService.error('Ocorreu um erro ao excluir ' + error, 'Atenção');
          }
        }
      );
    this.modalRef.hide();

  }

  create() {

    if (!this.nome) {
      this.toastService.warning('Digite o nome da especialidade', 'Atenção')
      return
    }

    this.especialidadeService.create(this.nome)
      .subscribe(res => {
        this.toastService.success('Especialidade cadastrada com sucesso', 'Sucesso');
        this.nome = "";
        this.getEspecialidades();

      },
        error => {

          this.toastService.error('Ocorreu um erro ao excluir ' + error, 'Atenção');

        }
      );

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
