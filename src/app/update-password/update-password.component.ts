import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../common-service.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

 
  isLoading = false;
  senha = '';
  confirmation = '';
  token = '';

  constructor(
    public router: Router,
    public commonService: CommonServiceService,
    private toastr: ToastrService,
    private userService: UserService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];

    if(!this.token){
      this.router.navigate(['/login']);
    }

  }

  redefinirSenha(){
    this.isLoading = true;

    if (!this.senha) {
      this.isLoading = false;
      this.toastr.warning('Preencha o campo senha!', 'Atenção!');
      return;
    }

    if (!this.confirmation) {
      this.isLoading = false;
      this.toastr.warning('Preencha o campo confirmação de senha!', 'Atenção!');
      return;
    }

    if (this.senha != this.confirmation) {
      this.isLoading = false;
      this.toastr.warning('Campo senha e confirmação não conferem!', 'Atenção!');
      return;
    }

    this.userService.updatePassword(this.token, this.senha).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.toastr.success('Senha alterada com sucesso', 'Sucesso :)');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.isLoading = false;
        console.log(error); 
        this.toastr.error('Erro ao recuperar senha', 'Atenção');
      }
    );
  }

}
