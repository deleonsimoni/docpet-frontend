import { VeterinarioService } from './../services/veterinario.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonServiceService } from '../common-service.service'
import { FormsModule } from '@angular/forms';
import { latLng, tileLayer } from 'leaflet';
import { Globals } from '../global';

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
  urlatual: any = [];
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



  constructor(private route: ActivatedRoute, public veterinarioService: VeterinarioService, public router: Router) { }
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
    this.veterinarioService.getByNoEspecialidadeMunicipio(especialidade, municipio).subscribe(
      (res) => {
        this.doctors = res;
        this.specialitiesDoctors = this.doctors[0].especialidades;
      
        this.getNomeEspecialidade(this.specialitiesDoctors);
        if(this.doctors.length > 0){

          this.lat = this.doctors[0].location.coordinates[1];
          this.lng = this.doctors[0].location.coordinates[0];

        }

      },
    );
    
  }
  getNomeEspecialidade(especialidadesVeterinario){
    
    var urls  = window.location.href; 
    this.urlatual = urls.split('/');
    
    especialidadesVeterinario.forEach(index => {
      var nm = index.nome;
      if (nm.toLowerCase() == this.urlatual[4]) {
        this.descEspecialidade = index.nome;
        
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

  bookAppointment(id) {
    // if((localStorage.getItem('auth') === 'true') && (localStorage.getItem('patient') === 'true')) {
    this.router.navigateByUrl('/patients/booking?id=' + id);
    // } else {
    //   this.router.navigate(['/']);
    // }
  }

}
