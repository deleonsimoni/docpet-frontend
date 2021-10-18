import { VeterinarioService } from './../services/veterinario.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonServiceService } from '../common-service.service'
import { FormsModule } from '@angular/forms';
import { latLng, tileLayer } from 'leaflet';


@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.component.html',
  styleUrls: ['./search-doctor.component.css']
})
export class SearchDoctorComponent implements OnInit {
  doctors: any = [];
  specialityList: any = [];
  type;
  specialist = "";
  speciality;
  selDate;
  idEspecialidade;


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
    this.idEspecialidade = this.route.snapshot.params['id'];
    this.getEstabelecimentos(this.idEspecialidade);
  }

  getEstabelecimentos(id) {
    this.veterinarioService.getByEspecialidade(id).subscribe(
      (res) => {
        this.doctors = res;
        console.log(this.doctors);
      },
    );
  }

    checkType(event) {
    if (event.target.checked) {
      this.type = event.target.value;
    } else {
      this.type = "";
    }
  }

  search() {
    if (this.type && this.speciality) {
      this.doctors = this.doctors.filter(a => a.type === this.type && a.speciality === this.speciality)
    } else {
     // this.getDoctors();
    }

  }

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
