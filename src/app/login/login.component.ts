import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from '../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isPatient: boolean = false;
  doctors: any = [];
  patients: any = [];
  username = '';
  password = '';
  isLoading = false;

  constructor(
    public router: Router,
    public commonService: CommonServiceService,
    private toastr: ToastrService,
    private userService: UserService,
  ) {
    this.username = '';
    this.password = '';
    this.doctors = [];
    this.patients = [];
  }

  ngOnInit(): void {

  }

  checkType(event) {
    this.isPatient = event.target.checked ? true : false;
  }

  login(name, password) {

    this.isLoading = true;

    if (!password) {
      this.toastr.warning('Preencha o campo senha!', 'Atenção!');
      return;
    }

    if (!name) {
      this.toastr.warning('PReencha o campo email!', 'Atenção!');
      return;
    }

    this.userService.login(name, password).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.userService.setSession(data.token);
        let user = this.userService.getUser();

        if(user.isAdmin ){
          this.router.navigate(['/admin/dashboard-admin']);
        } else  if( user.role == 1 || user.role == 2 || user.role == 3 || user.role == 4){
          this.router.navigate(['/admin']);
        } else {
          window.location.href = '/home';
        }    

      },
      (error) => {
        this.isLoading = false;
        console.log(error);
        if (error.status == 400) {
          this.toastr.error(error.error.error, 'Erro');

        }
        if (error.status == 401) {
          this.toastr.error('Email ou senha inválidos', 'Erro');

        }
      }
    );

  }

  
}
