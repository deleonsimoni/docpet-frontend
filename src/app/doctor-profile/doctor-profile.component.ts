import { VeterinarioService } from './../services/veterinario.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css'],
})
export class DoctorProfileComponent implements OnInit {
  id;
  docNameFormated;
  doctorDetails;
  constructor(
    private veterinarioService: VeterinarioService,
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

  getDoctorsDetails() {
    console.log('teste');
    if (this.docNameFormated) {

        console.log(this.docNameFormated);
        this.veterinarioService.getByName(this.docNameFormated).subscribe(
          (res) => {
            console.log("Teste", res);
            this.doctorDetails = res;

            //this.dtTrigger.next();
          },
          //(error) => (this.errorMessage = <any>error)
        );

    }

  }

  addFav() {

  }
}
