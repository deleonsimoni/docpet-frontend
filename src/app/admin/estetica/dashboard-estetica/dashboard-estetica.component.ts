import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EsteticaService } from 'src/app/services/estetica.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-estetica',
  templateUrl: './dashboard-estetica.component.html',
  styleUrls: ['./dashboard-estetica.component.css']
})
export class DashboardEsteticaComponent implements OnInit {

  user;
  estetica;

  constructor(
    private userService: UserService,
    public router: Router,
    private esteticaService: EsteticaService
  ) {}

  ngAfterViewInit() {
    if(this.user.isAdmin){
      this.router.navigate(['/admin/dashboard-estetica']);

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
    this.esteticaService.getByUser(idUser).subscribe(vet => {
      this.estetica = vet;
    })
  }

}
