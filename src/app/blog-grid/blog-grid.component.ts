import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.css'],
})
export class BlogGridComponent implements OnInit {
  blogs: any = [];
  categories: any = [];
  blog = false;
  urlatual: any = [];
  existe_especialidade = false;
  especialidade;
  numblog = 4;
  numpag = 1;
  constructor(private route: ActivatedRoute,public commonService: CommonServiceService, public router: Router) {}

  ngOnInit(): void {
    var urls  = window.location.href; 
    this.urlatual = urls.split('/');
    console.log(this.urlatual[4]);
    if (this.urlatual.length == 5){
      this.especialidade = this.urlatual[5];
      this.existe_especialidade = true;
      this.getBlogsEspecialidade();
    }else{
      this.especialidade = "";
      this.existe_especialidade = false;
      this.getBlogs();
    }
    this.getCategories();
    
    window.scrollTo(0, 0);
  }

  getBlogs() {
    //tamanho da imagem 1200X800
    
    this.blogs = [
      {
        id: 1,
        title: "Fazendo a sua visita clínica indolor?",
        link_blog: "fazendo-a-sua-visita-clinica-indolor",
        link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
        specialy: "Clínica Geral",
        doctor_name: "Dr. Gustavo Weigert",
        doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-3.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem1.png",
        createdAt: "2022-02-15"
      },
      {
          id: 2,
          title: "Quais são os benefícios do agendamento médico online?",
          link_blog: "quais-sao-os-beneficios-do-agendamento-medico-online",
          link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
          specialy: "Dermatologia",
          doctor_name: "Dr. Darren Elder",
          doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini.jpg",
          description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
          img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem3.png",
          createdAt: "2022-01-15"
      },
      {
        id: 3,
        title: "Benefícios da consulta com um Médico Online",
        link_blog: "beneficios-da-consulta-com-um-medico-online",
        link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
        specialy: "Medicina Preventiva",
        doctor_name: "Dra. Deborah Angel",
        doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem2.png",
        createdAt: "2021-12-15"
    },
    {
      id: 4,
      title: "5 Grandes razões para usar um Médico Online",
      link_blog: "5-grandes-razões-para-usar-um-medico-online",
      link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
      specialy: "Cardiologia",
      doctor_name: "Dr. Jerry Brient",
      doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-4.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
      img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem4.png",
      createdAt: "2021-11-15"
    },
    {
      id: 5,
      title: "Fazendo a sua visita clínica indolor?",
      link_blog: "fazendo-a-sua-visita-clinica-indolor",
      link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
      specialy: "Clínica Geral",
      doctor_name: "Dr. Ruby Perrin",
      doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-3.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
      img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem1.png",
      createdAt: "2022-02-15"
    },
    {
        id: 6,
        title: "Quais são os benefícios do agendamento médico online?",
        link_blog: "quais-sao-os-beneficios-do-agendamento-medico-online",
        link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
        specialy: "Dermatologia",
        doctor_name: "Dr. Darren Elder",
        doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem3.png",
        createdAt: "2022-01-15"
    },
    {
      id: 7,
      title: "Benefícios da consulta com um Médico Online",
      link_blog: "beneficios-da-consulta-com-um-medico-online",
      link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
      specialy: "Medicina Preventiva",
      doctor_name: "Dra. Deborah Angel",
      doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-2.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
      img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem2.png",
      createdAt: "2021-12-15"
  },
  {
    id: 8,
    title: "5 Grandes razões para usar um Médico Online",
    link_blog: "5-grandes-razões-para-usar-um-medico-online",
    link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
    specialy: "Cardiologia",
    doctor_name: "Dr. Jerry Brient",
    doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-4.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
    img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem4.png",
    createdAt: "2021-11-15"
  }
  ];
    console.log(this.blogs);
    this.numblog = this.blogs.length;
    this.numpag = this.numblog / 4;
    if (this.blogs.length > 4){
      this.blog = true;
    }else{
      this.blog = false;
    } 
  }
  getBlogsEspecialidade() {
    this.especialidade = this.urlatual[4].replace(/-/g, ' ').toUpperCase();
      console.log("esp: "+this.especialidade);
      this.blogs = [
        {
          id: 1,
          title: "Fazendo a sua visita clínica indolor?",
          link_blog: "fazendo-a-sua-visita-clinica-indolor",
          link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
          specialy: this.especialidade,
          doctor_name: "Dr. Gustavo Weigert",
          doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-3.jpg",
          description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
          img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem1.png",
          createdAt: "2022-02-15"
        },
        {
            id: 2,
            title: "Quais são os benefícios do agendamento médico online?",
            link_blog: "quais-sao-os-beneficios-do-agendamento-medico-online",
            link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
            specialy: this.especialidade,
            doctor_name: "Dr. Darren Elder",
            doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
            img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem3.png",
            createdAt: "2022-01-15"
        },
        {
          id: 3,
          title: "Benefícios da consulta com um Médico Online",
          link_blog: "beneficios-da-consulta-com-um-medico-online",
          link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
          specialy: this.especialidade,
          doctor_name: "Dra. Deborah Angel",
          doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-2.jpg",
          description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
          img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem2.png",
          createdAt: "2021-12-15"
      },
      {
        id: 4,
        title: "5 Grandes razões para usar um Médico Online",
        link_blog: "5-grandes-razões-para-usar-um-medico-online",
        link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
        specialy: this.especialidade,
        doctor_name: "Dr. Jerry Brient",
        doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-4.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem4.png",
        createdAt: "2021-11-15"
      },
      {
        id: 5,
        title: "Fazendo a sua visita clínica indolor?",
        link_blog: "fazendo-a-sua-visita-clinica-indolor",
        link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
        specialy: this.especialidade,
        doctor_name: "Dr. Ruby Perrin",
        doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-3.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem1.png",
        createdAt: "2022-02-15"
      }
      ];
    
    console.log(this.blogs);
    this.numblog = this.blogs.length;
    this.numpag = this.numblog / 4;
    if (this.blogs.length > 4){
      this.blog = true;
    }else{
      this.blog = false;
    } 
  }
  getCategories() {
    this.categories = [
      {
        id: 1,
        name: "Alergologie",
        num_blog: "70",
        link_author: "alergologie",
        
      },
      {
        id: 2,
        name: "Cardiologia",
        num_blog: "62",
        link_author: "cardiologia",
        
      },
      {
        id: 3,
        name: "Clínica Geral",
        num_blog: "37",
        link_author: "clinica-geral",
        
      },
      {
        id: 4,
        name: "Dermatologia",
        num_blog: "32",
        link_author: "dermatologia",
        
      },
      {
        id: 5,
        name: "Anestesiologia",
        num_blog: "30",
        link_author: "anestesiologia",
        
      },
      {
        id: 6,
        name: "Medicina Preventiva",
        num_blog: "28",
        link_author: "medicina-preventiva",
        
      },
      {
        id: 7,
        name: "Medicina Felina",
        num_blog: "24",
        link_author: "medicina-felina",
        
      },
      {
        id: 8,
        name: "Nutrição",
        num_blog: "19",
        link_author: "Nutricao",
        
      },
      {
        id: 9,
        name: "Oftalmologia",
        num_blog: "11",
        link_author: "oftalmologia",
        
      },
      {
        id: 10,
        name: "Banho e Tosa",
        num_blog: "5",
        link_author: "banho-e-tosa",
        
      }
    ];
  }
}
