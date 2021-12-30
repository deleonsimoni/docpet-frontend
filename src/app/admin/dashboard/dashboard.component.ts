import { VeterinarioService } from './../../services/veterinario.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Veterinario } from 'src/app/models/veterinario';
declare var $: any;
declare var Morris: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  user;
  veterinario;

  constructor(
    private userService: UserService,
    public router: Router,
    private veterinarioService: VeterinarioService
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
    this.getVeterinario(this.user.id);
  }

  getVeterinario(idUser){
    this.veterinarioService.getByUser(idUser).subscribe(vet => {
      this.veterinario = vet as Veterinario;
    })
  }

}
