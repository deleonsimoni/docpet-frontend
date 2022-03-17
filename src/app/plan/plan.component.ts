import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from '../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { PlanoService } from '../services/plano.service';
import { Plano } from '../models/plano';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent implements OnInit {
  @ViewChild('slickModal1') slickModal1: SlickCarouselComponent;
  @ViewChild('slickModal2') slickModal2: SlickCarouselComponent;

  isLoading = false;
  planos: any = [];

  constructor(
    public router: Router,
    public commonService: CommonServiceService,
    private toastr: ToastrService,
    private userService: UserService,
    private planosService: PlanoService,
  ) {}

  ngOnInit(): void {
    this.listarPlanos();
  }
  
  listarPlanos() {
    this.planosService.getAll().subscribe(
        (res) => {
          this.planos = res as Plano;
          console.log(this.planos);
        },
        error => {
          console.log(error);
          this.toastr.warning('Não foi possível efetuar a busca de planos', 'Atenção!');
          return;

        }
      );
  }

  getvalorPlano(cobranca){
    let preco;
    if(cobranca){
      if(cobranca.quantidadeParcela > 1){
        preco = Number(cobranca.valor) / cobranca.quantidadeParcela;
      }else{
        preco = cobranca.valor;
      } 
      const opcoes = { style: 'currency', currency: 'BRL' };
      return preco = (Intl.NumberFormat('pt-BR', opcoes).format(preco)); // Retorna R$ 1.200,55
    }
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
formataUrldados(dado){
  if(dado){
    return dado.trim().split(' ').join('-').toLowerCase();
  }

  return "";
}
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
