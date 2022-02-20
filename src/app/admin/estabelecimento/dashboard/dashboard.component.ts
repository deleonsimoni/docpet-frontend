import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstabelecimentoService } from '../../../services/estabelecimento.service';
import { Estabelecimento } from '../../../models/estabelecimento';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user;
  estabelecimento;
  hideFooter: boolean = true;
  showheader1:boolean = false;
  menuTopLogin : boolean = false;

  constructor(
    private userService: UserService,
    public router: Router,
    private estabelecimentoService: EstabelecimentoService
  ) {}

  ngAfterViewInit() {
    if(this.user.isAdmin){
      this.router.navigate(['/admin/dashboard-admin']);

    } else if (this.user.role == 0){
      this.userService.logout();
      window.location.href = '/home';
    }
  }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.getEsteticista(this.user.id);
  }

  getEsteticista(idUser){
    this.estabelecimentoService.getByUser(idUser).subscribe(obj => {
      this.estabelecimento = obj as Estabelecimento;
    })
  }

}
