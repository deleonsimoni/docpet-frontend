import { VeterinarioService } from './../../services/veterinario.service';

import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { CommonServiceService } from '../../common-service.service';
import { UserService } from 'src/app/services/user.service';
import { Veterinario } from 'src/app/models/veterinario';
import { AdestradorService } from 'src/app/services/adestrador.service';
import { EsteticaService } from 'src/app/services/estetica.service';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  page = 'Dashboard';
  showDropdown = true;
  public bellCollapsed = true;
  public userCollapsed = true;
  userLogged;
  veterinario;
  userRole;

  constructor(
    @Inject(DOCUMENT) private document,
    public router: Router,
    private commonService: CommonServiceService,
    private userService: UserService,
    private veterinarioService: VeterinarioService,
    private adestradorService: AdestradorService,
    private esteticaService: EsteticaService

  ) {}

  
  ngOnInit(): void {
    this.userLogged = this.userService.getUser();

    if(this.userLogged.isAdmin){
      this.page = 'Dashboard-admin';
      this.router.navigate(['/admin/dashboard-admin']);

    } else if (this.userLogged.role == 0){
      this.userService.logout();
      window.location.href = '/home';
    } else if(this.userLogged.role == 1){
      this.getVeterinario(this.userLogged.id);
    } else if(this.userLogged.role == 3){
      this.getAdestrador(this.userLogged.id);
    } else if(this.userLogged.role == 4){
      this.getEstetica(this.userLogged.id);
    }
  }

  getAdestrador(idUser){
    this.adestradorService.getByUser(idUser).subscribe(res => {
      this.userRole = res;
    })
  }

  getEstetica(idUser){
    this.esteticaService.getByUser(idUser).subscribe(res => {
      this.userRole = res;
    })
  }

  getVeterinario(idUser){
    this.veterinarioService.getByUser(idUser).subscribe(vet => {

      this.veterinario = vet as Veterinario;

    })
  }

  ngAfterViewInit() {
    this.loadDynmicallyScript('assets/admin/js/script.js');
  }
  loadDynmicallyScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() {}
  change(name) {
    this.page = name;
    this.commonService.nextmessage('admin');
  }

  main() {
    this.commonService.nextmessage('main');
  }
  clickLogout() {
    this.userService.logout();
    window.location.href = '/home';
  }

  changeScope(){
    window.location.href = '/home';
  }

  bell() {
    this.bellCollapsed = !this.bellCollapsed;
    if (!this.userCollapsed) {
      this.userCollapsed = true;
    }
  }
  user() {
    this.userCollapsed = !this.userCollapsed;
    if (!this.bellCollapsed) {
      this.bellCollapsed = true;
    }
  }
}
