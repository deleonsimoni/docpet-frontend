import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  id;
  titulo;
  blogdetails: any = [];
  blogs: any = [];
  comments: any = [];
  name = '';
  email = '';
  usercomment = '';
  constructor(
    private toastr: ToastrService,
    public commonService: CommonServiceService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.titulo = this.route.snapshot.queryParams['titulo'];
    this.getBlogdetails();
    this.getBlogs();
    this.getComments();
    window.scrollTo(0, 0);
  }

  getBlogdetails() {
    this.blogdetails = [
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
        comments:[
          {
            name: "Regina Weigert",
            comment: "Achei interessante a matéria!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
            data: "2022-01-15"
          },
          {
            name: "João Silva",
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
            data: "2022-02-15"
          },
          {
            name: "Maria F Vargas",
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
            data: "2022-02-20"
          }
        ],
        type: "",
        createdAt: "2022-02-15"
      }
    ];
  }

  getBlogs() {
    this.blogs = [
      {
        id: 1,
        title: "Fazendo a sua visita clínica indolor?",
        link_blog: "fazendo-a-sua-visita-clinica-indolor",
        link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
        specialy: "Clínica Geral",
        doctor_name: "Dr. Ruby Perrin",
        doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-3.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem1.png",
        createdAt: "2022-02-15"
      }
    ];
  }

  getComments() {
    this.comments = this.blogdetails.comments;
    
  }

  navigate(blog) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/blog-details/=' + blog.id);
    });
  }

  comment() {
    if (this.name === '' || this.email === '' || this.usercomment === '') {
      this.toastr.error('', 'Please enter mandatory field');
    } else {
      let params = {
        id: this.comments.length + 1,
        name: this.name,
        email: this.email,
        comment: this.usercomment,
      };
      this.commonService.createComment(params).subscribe((res) => {
        this.toastr.success('', 'Comment successfully!');
        this.name = '';
        this.email = '';
        this.usercomment = '';
        this.getComments();
      });
    }
  }
}
