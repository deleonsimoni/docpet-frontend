import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../common-service.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isLoading = false;
  email = '';

  constructor(
    public router: Router,
    public commonService: CommonServiceService,
    private toastr: ToastrService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  redefinirSenha(){
    this.isLoading = true;

    if (!this.email) {
      this.toastr.warning('Preencha o campo email!', 'Atenção!');
      return;
    }

    this.userService.changePassword(this.email).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.toastr.success('Verifique sua caixa de email', 'Sucesso :)');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.isLoading = false;
        console.log(error); 
        this.toastr.success('Verifique sua caixa de email', 'Sucesso :)');
      }
    );
  }

}
