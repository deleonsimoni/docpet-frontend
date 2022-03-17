import { VeterinarioService } from './../services/veterinario.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonServiceService } from '../common-service.service'
import { FormsModule } from '@angular/forms';
import { latLng, tileLayer } from 'leaflet';
import { Globals } from '../global';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.component.html',
  styleUrls: ['./search-doctor.component.css']
})
export class SearchDoctorComponent implements OnInit {
  doctors: any = [];
  specialitydoctors: any = [];
  specialityList: any = [];
  specialitiesDoctors: any = [];
  municipioDoctors: any = [];
  urlatual: any = [];
  exibeResult = true;
  type;
  specialist = "";
  speciality;
  selDate;
  especialidade;
  dsMunicipio;
  lat;
  lng;
  descEspecialidade;


  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13,
    center: latLng(-22.9186483, -43.1892977)
  };



  constructor(private route: ActivatedRoute, public veterinarioService: VeterinarioService, public router: Router,  private spinner: NgxSpinnerService,) { }
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
    this.especialidade = this.route.snapshot.params['especialidade'];
    this.dsMunicipio = this.route.snapshot.params['municipio'] ?  this.route.snapshot.params['municipio'] : 'Brasil' ;
    this.getEstabelecimentos(this.especialidade, this.dsMunicipio);
    
  }
  getEstabelecimentos(especialidade, municipio) {
    this.spinner.show();
    this.veterinarioService.getByNoEspecialidadeMunicipio(especialidade, municipio).subscribe(
      (res) => {
        this.doctors = res;
        
        if(this.doctors.length > 0){

          this.specialitiesDoctors = this.doctors[0].especialidades;
          this.getNomeEspecialidade(this.specialitiesDoctors);

          this.lat = this.doctors[0].location.coordinates[1];
          this.lng = this.doctors[0].location.coordinates[0];

        }else{
          this.exibeResult = false;
        }

        this.spinner.hide();
      },
      error => {
        this.exibeResult = false;
        this.spinner.hide();
       console.log(error);
      }
    );
    
  }
  getNomeEspecialidade(especialidadesVeterinario){
    
    var urls  = window.location.href; 
    this.urlatual = urls.split('/');
    
    especialidadesVeterinario.forEach(index => {
      var nm = index.nome;
      if (this.urlatual[5] != null){
        var mun = this.urlatual[5].replace(/-/g, ' ');
        var muns = mun.toUpperCase();
      }
      if (nm.toLowerCase() == this.urlatual[4]) {
        this.descEspecialidade = index.nome+ '  ' +muns;
        
      }
    })
  }
    checkType(event) {
    if (event.target.checked) {
      this.type = event.target.value;
    } else {
      this.type = "";
    }
  }

 /* search() {
    if (this.type && this.speciality) {
      this.doctors = this.doctors.filter(a => a.type === this.type && a.speciality === this.speciality)
    } else {
     // this.getDoctors();
    }

  } */

  checkSpeciality(event) {
    if (event.target.checked) {
      this.speciality = event.target.value;
    } else {
      this.speciality = "";
    }

    var filter = this.specialityList.filter(a => a.speciality === event.target.value);
    if (filter.length != 0) {
      filter[0]['checked'] = true;
    }
    this.specialityList.forEach(index => {
      if (index.speciality != event.target.value) {
        index['checked'] = false;
      }
    })
  }
  formataUrldados(nome,especialidade, municipio){
    if(nome && especialidade && municipio){
      return (nome.trim().split(' ').join('-')+"/"+especialidade.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim().split(' ').join('-')+"/"+municipio.trim().split(' ').join('-')).toLowerCase();
    }

    return "";
  }
  bookAppointment(id) {
    // if((localStorage.getItem('auth') === 'true') && (localStorage.getItem('patient') === 'true')) {
    this.router.navigateByUrl('/patients/booking?id=' + id);
    // } else {
    //   this.router.navigate(['/']);
    // }
  }
  getStar(doctorDetails){
    if (doctorDetails.reviews.length > 0) {

      let total = 0;
      let rates = [0,0,0,0,0];
      let totalStar =0;
      let totalStarFormated = 0;

      for (let item of doctorDetails.reviews) {
        if (item.score) {
          total += 1;

          if(item.score == 1){
            rates[0] += 1;
          } else if (item.score == 2) {
            rates[1] += 1;
          } else if (item.score == 3) {
            rates[2] += 1;
          } else if (item.score == 4) {
            rates[3] += 1;
          } else if (item.score == 5) {
            rates[4] += 1;
          }

        }
      }

      if (total > 0) {

          totalStar = (rates[0]*1 + rates[1]*2 + rates[2]*3 + rates[3]*4 + rates[4]*5) / total
          totalStarFormated = Math.round(totalStar);

        if (totalStar >= 5) {
          totalStar = 5;
          totalStarFormated = 5;
        }

      }
      return totalStarFormated;
    }
  }

  getTotalStar(doctorDetails){
    if (doctorDetails.reviews.length > 0) {

      let total = 0;
      let rates = [0,0,0,0,0];
      let totalStar =0;

      for (let item of doctorDetails.reviews) {
        if (item.score) {
          total += 1;
          if(item.score == 1){
            rates[0] += 1;
          } else if (item.score == 2) {
            rates[1] += 1;
          } else if (item.score == 3) {
            rates[2] += 1;
          } else if (item.score == 4) {
            rates[3] += 1;
          } else if (item.score == 5) {
            rates[4] += 1;
          }
        }
      }

      if (total > 0) {
          totalStar = (rates[0]*1 + rates[1]*2 + rates[2]*3 + rates[3]*4 + rates[4]*5) / total
        if (totalStar >= 5) {
          totalStar = 5;    
        }

      }
      return totalStar;
    }
  }

  totalLike(doctorDetails){

    let totalLike = 0;
    let totalDislike = 0;

    for (let item of doctorDetails.reviews) {
      if (item.like === true) {
        totalLike+=1;
      } else if (item.like === false){
        totalDislike+=1;
      }
    }

    totalLike = (totalLike/(totalLike + totalDislike)) * 100;

    if(isNaN(totalLike) || totalLike < 0){
      totalLike = 0;
    } else {
      totalLike = Math.round(totalLike);
    }

    return totalLike;
  }

}
