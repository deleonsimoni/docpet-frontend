import { EstabelecimentoService } from './../services/estabelecimento.service';
import { VeterinarioService } from './../services/veterinario.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Veterinario } from '../models/veterinario';


@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css'],
})
export class DoctorProfileComponent implements OnInit {
  id;
  docNameFormated;
  doctorDetails;
  estabelecimentos;
  like = false;

  meses = [ {id:1, mes:'Janeiro', abreviado:'Jan'},
  {id:2, mes:'Fevereiro', abreviado:'Fev'},
  {id:3, mes:'Março', abreviado:'Mar'},
  {id:4, mes:'Abril', abreviado:'Abr'},
  {id:5, mes:'Maio', abreviado:'Mai'},
  {id:6, mes:'Junho', abreviado:'Jun'},
  {id:7, mes:'Julho', abreviado:'Jul'},
  {id:8, mes:'Agosto', abreviado:'Ago'},
  {id:9, mes:'Setembro', abreviado:'Set'},
  {id:10, mes:'Outubro', abreviado:'Out'},
  {id:11, mes:'Novembro', abreviado:'Nov'},
  {id:12, mes:'Dezembro', abreviado:'Dez'},
];

  constructor(
    private veterinarioService: VeterinarioService,
    private estabelecimentoService: EstabelecimentoService,
    private route: ActivatedRoute,
    public router: Router,

  ) {}
  images = [
    {
      path: 'assets/img/features/feature-01.jpg',
    },
    {
      path: 'assets/img/features/feature-02.jpg',
    },
    {
      path: 'assets/img/features/feature-03.jpg',
    },
    {
      path: 'assets/img/features/feature-04.jpg',
    },
  ];
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    this.id = this.route.snapshot.params['id'];
    this.docNameFormated = this.route.snapshot.params['nome'];
    this.getDoctorsDetails();

    window.scrollTo(0, 0);


  }

  getImageDoctor(doctorDetails){
    return doctorDetails?.img ? doctorDetails.img : 'https://image.freepik.com/vetores-gratis/medico-icone-ou-avatar-em-branco_136162-58.jpg'
  }

  likeIt(){

    this.like = !this.like;

  }

  getDoctorsDetails() {
    if (this.docNameFormated) {
        this.veterinarioService.getByName(this.docNameFormated).subscribe(
          (res) => {
            this.doctorDetails = res as Veterinario;
             //this.dtTrigger.next();
          },
          //(error) => (this.errorMessage = <any>error)
        );

    }

  }

  getMes(i){
    return this.meses[i-1].abreviado;
  }
}
