import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.css'],
})
export class BlogGridComponent implements OnInit {
  blogs: any = [];
  blog = false;
  numblog = 4;
  numpag = 1;
  constructor(public commonService: CommonServiceService) {}

  ngOnInit(): void {
    this.getBlogs();
    window.scrollTo(0, 0);
  }

  getBlogs() {
    //tamanho da imagem 1200X800
    this.blogs = [
      {
        id: 1,
        title: "Fazendo a sua visita clínica indolor?",
        specialy: "Clínica Geral",
        doctor_name: "Dr. Ruby Perrin",
        doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-3.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem1.png",
        createdAt: "2022-02-15"
      },
      {
          id: 2,
          title: "Quais são os benefícios do agendamento médico online?",
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
    specialy: "Cardiologia",
    doctor_name: "Dr. Jerry Brient",
    doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-4.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
    img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem4.png",
    createdAt: "2021-11-15"
  }
    ];
    this.numblog = this.blogs.length;
    this.numpag = this.numblog / 4;
    if (this.blogs.length > 4){
      this.blog = true;
    }else{
      this.blog = false;
    } 
  }
}
