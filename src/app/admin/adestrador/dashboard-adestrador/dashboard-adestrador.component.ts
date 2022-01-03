import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdestradorService } from "src/app/services/adestrador.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-dashboard-adestrador',
  templateUrl: './dashboard-adestrador.component.html',
  styleUrls: ['./dashboard-adestrador.component.css']
})
export class DashboardAdestradorComponent implements OnInit {

  user;
  adestrador;

  constructor(
    private userService: UserService,
    public router: Router,
    private adestradorService: AdestradorService
  ) {}

  ngAfterViewInit() {
    if(this.user.isAdmin){
      this.router.navigate(['/admin/dashboard-adestrador']);

    } else if (this.user.role == 0){
      this.userService.logout();
      window.location.href = '/home';
    }
  }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.getVeterinario(this.user.id);
  }

  getVeterinario(idUser){
    this.adestradorService.getByUser(idUser).subscribe(vet => {
      this.adestrador = vet;
    })
  }

}
