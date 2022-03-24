import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../common-service.service'
import * as $ from 'jquery';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  users: any = [];
  errorMessage: string;
  user;

  constructor(
    public commonService: CommonServiceService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser()

    if (this.user.isAdmin) {
      this.getUsers();
    }
  }


  changeAdmin(user, isAdmin) {

    this.userService.changeAdmin(user._id, isAdmin)
      .subscribe((res: any) => {

        this.getUsers();

        if (isAdmin) {
          this.toastrService.success('Usuário tornou-se administrador', 'Sucesso', {
            timeOut: 3000
          });
        } else {
          this.toastrService.warning('Usuário deixou de ser administrador', 'Sucesso', {
            timeOut: 3000
          });
        }

      }, error => {
        this.toastrService.error('Erro', 'Ops!', {
          timeOut: 3000
        });
      });



  }

  getUsers() {
    this.spinner.show();
    this.userService.getUsers()
      .subscribe(res => {
        this.users = res.users.sort(function (a, b) {
          var dateA: any = new Date(a.createdAt);
          var dateB: any = new Date(b.createdAt);
          return (dateB - dateA)
        });
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.errorMessage = <any>error
        });
  }

}
