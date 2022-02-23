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
  
  depoimentosliderConfig = {
    dots: false,
			autoplay:false,
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			rows: 1,
			responsive: [{
				breakpoint: 992,
					settings: {
						slidesToShow: 3
				  	}
			},
			{
				breakpoint: 800,
					settings: {
						slidesToShow: 3
				  	}
			},
			{
				breakpoint: 776,
					settings: {
						slidesToShow: 3
				  	}
			},
			{
				breakpoint: 567,
					settings: {
						slidesToShow: 1
					}
			}]
  };
  depoimentosliderslides = [
    {
      img: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini.jpg",
      imghover: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini.jpg",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      author: "Gustavo Weigert",
      department: "Anestesiologia",
      doctors: "124"
    },
    {
      img: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-4.jpg",
      imghover: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-4.jpg",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      author: "João Shive",
      department: "Clinica Geral",
      doctors: "124"
    },
    {
      img: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-2.jpg",
      imghover: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-2.jpg",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      author: "Mercia Toledo",
      department: "Cardiologia",
      doctors: "124"
    },
    {
      img: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-3.jpg",
      imghover: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-3.jpg",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      author: "Edson Ribon",
      department: "Neurologia",
      doctors: "124"
    },
    
  ];
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
