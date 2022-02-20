import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from '../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent implements OnInit {
  @ViewChild('slickModal1') slickModal1: SlickCarouselComponent;
  @ViewChild('slickModal2') slickModal2: SlickCarouselComponent;
  isPatient: boolean = false;
  doctors: any = [];
  patients: any = [];
  username = '';
  password = '';
  isLoading = false;

  constructor(
    public router: Router,
    public commonService: CommonServiceService,
    private toastr: ToastrService,
    private userService: UserService,
  ) {
    this.username = '';
    this.password = '';
    this.doctors = [];
    this.patients = [];
  }

  ngOnInit(): void {

  }

  checkType(event) {
    this.isPatient = event.target.checked ? true : false;
  }

  login(name, password) {

    this.isLoading = true;

    if (!password) {
      this.toastr.warning('Preencha o campo senha!', 'Atenção!');
      return;
    }

    if (!name) {
      this.toastr.warning('PReencha o campo email!', 'Atenção!');
      return;
    }

    this.userService.login(name, password).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.userService.setSession(data.token);
        let user = this.userService.getUser();

        if(user.isAdmin ){
          this.router.navigate(['/admin/dashboard-admin']);
        } else  if( user.role == 1 || user.role == 2 || user.role == 3 || user.role == 4){
          this.router.navigate(['/admin']);
        } else {
          window.location.href = '/home';
        }    

      },
      (error) => {
        this.isLoading = false;
        console.log(error);
        if (error.status == 400) {
          this.toastr.error(error.error.error, 'Erro');

        }
        if (error.status == 401) {
          this.toastr.error('Email ou senha inválidos', 'Erro');

        }
      }
    );

  }
 //// next step 2
 sliderContent = [
  {
    img: 'assets/img/features/feature-01.jpg',
    msg:
      '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
    name: 'Patient Ward',
    position: 'CEO of VoidCoders',
  },
  {
    img: 'assets/img/features/feature-02.jpg',
    msg:
      '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
    name: 'Test Room',
    position: 'CEO of VoidCoders',
  },
  {
    img: 'assets/img/features/feature-03.jpg',
    msg:
      '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
    name: 'ICU',
    position: 'CEO of VoidCoders',
  },
  {
    img: 'assets/img/features/feature-04.jpg',
    msg:
      '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
    name: 'Laboratory',
    position: 'CEO of VoidCoders',
  },
  {
    img: 'assets/img/features/feature-05.jpg',
    msg:
      '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
    name: 'Operation',
    position: 'CEO of VoidCoders',
  },
  {
    img: 'assets/img/features/feature-06.jpg',
    msg:
      '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
    name: 'Medical',
    position: 'CEO of VoidCoders',
  },
  {
    img: 'assets/img/features/feature-05.jpg',
    msg:
      '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
    name: 'Patient Ward',
    position: 'CEO of VoidCoders',
  },
];
  next() {
    this.slickModal1.slickNext();
  }

  prev() {
    this.slickModal1.slickPrev();
  }
  slideConfigure = {
    dots: false,
    autoplay: false,
    infinite: true,
    variableWidth: true,
  };
  
}
